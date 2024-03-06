// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
// 型定義
import type { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  {params}: {params: {userid: string}}
) {

  if (req.method !== 'GET') {
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        'Allow': 'GET',
      },
    })
  }

  const userId = parseInt(params.userid as string, 10);

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' });
    }
  } catch (error) {
    return NextResponse.json({message: 'Something went wrong' }, {status: 500});
  }
}