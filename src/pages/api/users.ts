// schema.prismaで定義されたモデルを使用
import { PrismaClient } from '@prisma/client';

// 型定義
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// レスポンスの型定義
// type ResponseData = {message: string} | User[] | User;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        // ユーザー一覧の取得
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        break;
      case 'POST':
        // 新規ユーザーの作成
        const newUser = await prisma.user.create({
          data: req.body,
        });
        res.status(201).json(newUser);
        break;
      case 'PUT':
        // ユーザー情報の更新
        const updatedUser = await prisma.user.update({
          where: { id: Number(req.body.id) },
          data: req.body,
        });
        res.status(200).json(updatedUser);
        break;
      case 'DELETE':
        // ユーザーの削除
        const deletedUser = await prisma.user.delete({
          where: { id: Number(req.body.id) },
        });
        res.status(200).json(deletedUser);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}