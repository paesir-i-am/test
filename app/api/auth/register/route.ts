import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  password_confirm: z.string(),
  name: z.string().min(1, '이름을 입력해주세요'),
  role: z.enum(['buyer', 'seller', 'both']),
}).refine((data) => data.password === data.password_confirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['password_confirm'],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 입력 검증
    const validatedData = registerSchema.parse(body);

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_EMAIL',
            message: '이미 사용 중인 이메일입니다',
          },
        },
        { status: 409 }
      );
    }

    // 비밀번호 해시
    const hashedPassword = await hashPassword(validatedData.password);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: validatedData.role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile_image_url: true,
        status: true,
        created_at: true,
      },
    });

    // JWT 토큰 생성
    const token = generateToken(user.id, user.email, user.role);

    return NextResponse.json(
      {
        success: true,
        data: {
          user,
          token,
        },
        message: '회원가입이 완료되었습니다',
      },
      { status: 201 }
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
    console.error('회원가입 에러:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '회원가입에 실패했습니다',
        },
      },
      { status: 500 }
    );
  }
}

