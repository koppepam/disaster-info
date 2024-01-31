import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient({ log: [ 'query' ] });
  if (session && session.user) {
    await prisma.area.deleteMany({
      where: { userId: session.user.id! }
    });
    return new Response(JSON.stringify({ message: '削除しました' }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'ログインしてください' }), { status: 401 });
  }
}