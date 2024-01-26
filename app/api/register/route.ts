// 地域の登録フォームの内容を受け取る
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);
  return new Response(JSON.stringify(body));
}