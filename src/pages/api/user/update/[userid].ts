// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';

// 型定義
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // クエリパラメータ（文字列）を数値型に変換
  const userId = parseInt(req.query.userid as string, 10);
  console.log(userId)
 
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: req.body,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}