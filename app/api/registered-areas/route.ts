import { PrismaClient } from '@prisma/client';
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
const prisma = new PrismaClient({ log: [ 'query' ] });

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    const areas = await prisma.area.findMany({
      where: { userId: session.user.id! },
    });
    return new Response(JSON.stringify(areas), { status: 200 });
  }
  return new Response(JSON.stringify({ message: 'ログインしてください' }), { status: 401 });
}
