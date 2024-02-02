// 地域の登録フォームの内容を受け取る
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

type Group = {
  groupName: string;
  group: string[][];
};


export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient({ log: [ 'query' ] });
  if (session && session.user) {
    for (const [key, values] of Object.entries(body)) {
      for (const value of values as string[]){
        const areaName = await checkAreaName({ key, value });
        const data = {
          userId: session.user.id!,
          areaCode: value,
          disaster: key,
          areaName: areaName || '不明'
        }
        await prisma.area.upsert({
          where: {
            registeredArea: { 
              userId: session.user.id!,
              areaCode: value,
              disaster: key
            },
          },
          create: data,
          update: data
        });
      }
    }
    return new Response(JSON.stringify({ message: '登録しました' }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'ログインしてください' }), { status: 401 });
  }
}

async function checkAreaName ({ key, value }: { key: string, value: string }) {
  let url = '';

  if (key === 'earthquakeAreas') {
    url = `${process.env.URL}/data/earthquake-area.json`;
  } else if (key === 'tsunamiAreas') {
    url = `${process.env.URL}/data/tsunami-area.json`;
  } else if (key === 'tyhoonAreas') {
    url = `${process.env.URL}/data/tyhoon-area.json`;
  }

  if (url) {
    const response = await fetch(url);
    const responseJson: Group[] = await response.json();

    const areaMap = new Map<string, string>();
    const areas = responseJson.forEach((group) => {
      group.group.forEach((area) => {
        areaMap.set(area[0], area[1]);
      });
    });
    return areaMap.get(value);
  } else {
    throw new Error('urlがありません');
  }
}