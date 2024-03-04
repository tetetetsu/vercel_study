// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';

// 型定義
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // クエリパラメータ（文字列）を数値型に変換
  const userId = parseInt(req.query.userid as string, 10);
  console.log(userId)

  try {
    const deleteUser = await prisma.user.delete({
      where: {id: userId}
    });
    return res.status(200).json(deleteUser);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
}