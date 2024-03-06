// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
// 型定義
import type { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
) {
  if (req.method !== 'GET') {
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        'Allow': 'GET',
      },
    })
  }

  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
    // ↑でも↓でもok
    // return new Response(JSON.stringify(users), {
    //   status: 200,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}