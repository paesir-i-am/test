import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 입력 검증
    const validatedData = loginSchema.parse(body);

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: '이메일 또는 비밀번호가 올바르지 않습니다',
          },
        },
        { status: 401 }
      );
    }

    // 계정 상태 확인
    if (user.status === 'suspended') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ACCOUNT_SUSPENDED',
            message: '정지된 계정입니다',
          },
        },
        { status: 403 }
      );
    }

    if (user.status === 'deleted') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ACCOUNT_DELETED',
            message: '삭제된 계정입니다',
          },
        },
        { status: 403 }
      );
    }

    // 비밀번호 확인
    const isPasswordValid = await verifyPassword(validatedData.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: '이메일 또는 비밀번호가 올바르지 않습니다',
          },
        },
        { status: 401 }
      );
    }

    // 마지막 로그인 시간 업데이트
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login_at: new Date() },
    });

    // JWT 토큰 생성
    const token = generateToken(user.id, user.email, user.role);

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            profile_image_url: user.profile_image_url,
            status: user.status,
          },
          token,
        },
        message: '로그인 성공',
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
    console.error('로그인 에러:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '로그인에 실패했습니다',
        },
      },
      { status: 500 }
    );
  }
}

