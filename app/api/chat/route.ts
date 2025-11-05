import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const chatSchema = z.object({
  message: z.string().min(1, '메시지는 1자 이상이어야 합니다.').max(500, '메시지는 500자 이하여야 합니다.'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAS9ItTWyKjSf1iDCQU4zQm8ACB9tFHks4';

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const SYSTEM_PROMPT = `당신은 중고차 판매 플랫폼 "쑤카"의 전문 AI 상담사입니다. 
사용자에게 중고차 구매 관련 조언과 정보를 제공하는 것이 주 임무입니다.

주요 역할:
1. 차량 추천 및 조언
2. 중고차 구매 시 주의사항 안내
3. 차량 사양 및 옵션 설명
4. 거래 절차 안내
5. 중고차 관련 질문에 대한 전문적인 답변

답변 시:
- 친절하고 전문적인 톤을 유지하세요
- 구체적이고 실용적인 정보를 제공하세요
- 한국어로 답변하세요
- 불확실한 정보는 추측하지 말고 솔직하게 말하세요`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = chatSchema.parse(body);

    // Gemini 모델 선택 (gemini-2.5-flash-preview-05-20 사용)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash-preview-05-20',
    });

    // 대화 히스토리 구성
    // Gemini API는 history의 첫 번째 메시지가 반드시 'user' 역할이어야 함
    const history = validatedData.history || [];
    
    // 첫 번째 메시지가 user가 아닌 경우 필터링 (초기 인사 메시지 제외)
    let filteredHistory = history;
    if (history.length > 0 && history[0].role !== 'user') {
      // 첫 번째 메시지가 assistant이면 제외
      filteredHistory = history.filter((msg) => msg.role === 'user' || history.indexOf(msg) !== 0);
    }
    
    const chatHistory = filteredHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // 1) 차량 개수 질의 의도 감지 시, DB에서 직접 응답 (Gemini 우회)
    const msg = validatedData.message.trim();
    const countIntent = /(몇\s*대|개수|총\s*몇|전체\s*차량\s*수|총\s*차량\s*대수|how\s*many|count)/i.test(msg);
    if (countIntent) {
      try {
        const total = await prisma.vehicle.count({ where: { status: 'approved' } });
        return NextResponse.json(
          {
            success: true,
            data: {
              response: `현재 판매 중으로 승인된 차량은 총 ${total}대입니다. 최신 재고 기준이며, 실시간으로 변동될 수 있습니다. 필요한 조건(제조사, 모델, 연식, 예산 등)을 알려주시면 해당 조건에 맞는 차량 수도 바로 안내해 드릴게요.`,
            },
          },
          { status: 200 }
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('차량 개수 조회 에러:', e);
        // count 실패 시 일반 흐름으로 폴백
      }
    }

    // DB 차량 컨텍스트 생성
    async function buildVehicleContext(userMessage: string): Promise<string> {
      try {
        const keywords = Array.from(
          new Set(
            userMessage
              .toLowerCase()
              .replace(/[^a-z0-9가-힣\s]/g, ' ')
              .split(/\s+/)
              .filter((w) => w && w.length >= 2)
          )
        ).slice(0, 6);

        // 키워드가 없으면 최근 approved 매물 노출
        const where = keywords.length
          ? {
              status: 'approved',
              OR: [
                { detail_model_name: { contains: userMessage } },
                { description: { contains: userMessage } },
                { region: { contains: userMessage } },
                { color: { contains: userMessage } },
                { manufacturer: { name: { contains: userMessage } } },
                { model: { name: { contains: userMessage } } },
                // 키워드 단위 매칭
                ...keywords.map((k) => ({ detail_model_name: { contains: k } })),
                ...keywords.map((k) => ({ description: { contains: k } })),
                ...keywords.map((k) => ({ region: { contains: k } })),
                ...keywords.map((k) => ({ color: { contains: k } })),
                ...keywords.map((k) => ({ manufacturer: { name: { contains: k } } })),
                ...keywords.map((k) => ({ model: { name: { contains: k } } })),
              ],
            }
          : { status: 'approved' as const };

        const vehicles = await prisma.vehicle.findMany({
          where,
          take: 5,
          orderBy: { created_at: 'desc' },
          include: {
            manufacturer: true,
            model: true,
            images: {
              where: { is_thumbnail: true },
              take: 1,
            },
          },
        });

        if (!vehicles.length) return '';

        const lines = vehicles.map((v, idx) => {
          const price = (() => {
            try {
              const n = parseInt(v.price);
              return isNaN(n) ? v.price : n.toLocaleString('ko-KR') + '원';
            } catch {
              return v.price;
            }
          })();
          const thumb = v.images[0]?.image_url || '이미지 없음';
          return `${idx + 1}) ${v.manufacturer.name} ${v.model.name} ${v.detail_model_name ?? ''} | 연식: ${v.year} | 주행: ${v.mileage.toLocaleString('ko-KR')}km | 가격: ${price} | 연료: ${v.fuel_type} | 변속기: ${v.transmission} | 지역: ${v.region} | 썸네일: ${thumb}`.trim();
        });

        return `다음은 내부 데이터베이스의 최신 매물 요약입니다 (최대 5건):\n${lines.join('\n')}`;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('차량 컨텍스트 생성 에러:', e);
        return '';
      }
    }

    let text: string;

    try {
      const vehicleContext = await buildVehicleContext(validatedData.message);
      const contextPrefix = vehicleContext
        ? `${SYSTEM_PROMPT}\n\n[내부 매물 데이터]\n${vehicleContext}\n\n지시사항:\n- 위 내부 매물 데이터를 우선적으로 참고하여 답변하세요.\n- 내부 데이터에 해당 정보가 없을 경우에만 일반적인 지식을 보완적으로 사용하세요.\n- 질문에 직접적으로 관련된 매물만 간결하게 추천하거나 비교하세요.\n\n`
        : `${SYSTEM_PROMPT}\n\n`;

      if (chatHistory.length > 0) {
        // 히스토리가 있는 경우 채팅 세션 사용
        const chat = model.startChat({
          history: chatHistory,
        });
        const result = await chat.sendMessage(`${contextPrefix}사용자 질문: ${validatedData.message}\n\n상담사 답변:`);
        const response = await result.response;
        text = response.text();
      } else {
        // 첫 메시지인 경우 시스템 프롬프트 포함하여 생성
        const fullPrompt = `${contextPrefix}사용자 질문: ${validatedData.message}\n\n상담사 답변:`;
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        text = response.text();
      }
    } catch (apiError: unknown) {
      // eslint-disable-next-line no-console
      console.error('Gemini API 호출 에러:', apiError);
      throw apiError;
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          response: text,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: error.errors[0].message,
          },
        },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-console
    console.error('챗봇 에러:', error);
    
    // 에러 메시지 추출
    let errorMessage = '챗봇 응답 생성 중 오류가 발생했습니다.';
    if (error instanceof Error) {
      errorMessage = error.message;
      // eslint-disable-next-line no-console
      console.error('에러 상세:', error.stack);
    }
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CHAT_ERROR',
          message: errorMessage,
        },
      },
      { status: 500 }
    );
  }
}
