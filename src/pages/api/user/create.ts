// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';

// 型定義
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
 
  try {
    const addUser = await prisma.user.create({
      data: req.body,
    });
    res.status(200).json(addUser);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}