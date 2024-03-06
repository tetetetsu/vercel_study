// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
// 型定義
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  {params}: {params: {userid: string}}
) {
  if (req.method !== 'PATCH') {
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        'Allow': 'PATCH',
      },
    })
  }

  const userId = parseInt(params.userid as string, 10);

  // if (req.method !== 'PATCH') {
  //   res.setHeader('Allow', ['PATCH']);
  //   return res.status(405).end(`Method ${req.method} Not Allowed`);
  // }

  // // クエリパラメータ（文字列）を数値型に変換
  // const userId = parseInt(req.query.userid as string, 10);
  // console.log(userId)
 
  try {
    const data = await req.json();
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
    });
    return NextResponse.json(updateUser, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, {status: 500});
  }
}