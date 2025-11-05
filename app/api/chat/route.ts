import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
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

    let text: string;

    try {
      if (chatHistory.length > 0) {
        // 히스토리가 있는 경우 채팅 세션 사용
        const chat = model.startChat({
          history: chatHistory,
        });
        const result = await chat.sendMessage(validatedData.message);
        const response = await result.response;
        text = response.text();
      } else {
        // 첫 메시지인 경우 시스템 프롬프트 포함하여 생성
        const fullPrompt = `${SYSTEM_PROMPT}\n\n사용자 질문: ${validatedData.message}\n\n상담사 답변:`;
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
