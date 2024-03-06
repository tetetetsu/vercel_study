// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';

// 型定義
import type { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
) {
  if (req.method !== 'POST') {
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        'Allow': 'POST',
      }
    });
  }
  
  try {
    // リクエストボディを非同期で取得
    const data = await req.json();
    const addUser = await prisma.user.create({
      data: data,
    });
    return new Response(JSON.stringify(addUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}