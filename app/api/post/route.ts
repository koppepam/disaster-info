// 地域の登録フォームの内容を受け取る
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(req:NextRequest, res:NextResponse) {
  console.log(req.body);
}