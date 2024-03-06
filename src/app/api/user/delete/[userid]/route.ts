// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';

// 型定義
import type { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  // route handlersの動的ルーティングの取得
  {params}: {params: {userid: string}}
) {
  if (req.method !== 'DELETE') {
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        'Allow': 'DELETE',
      },
    })
  }
  const userId = parseInt(params.userid as string, 10);

  try {
    const deleteUser = await prisma.user.delete({
      where: {id: userId}
    });
    return new Response(JSON.stringify(deleteUser), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
}