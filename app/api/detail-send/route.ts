import { NextRequest, NextResponse } from "next/server";
import * as xml2js from 'xml2js';
import { Entry } from '@/components/types/types';

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  const url = `https://www.data.jma.go.jp/developer/xml/data/${id}.xml`;
  // const url = `https://koppepam.github.io/disaster-info-data/${id}.xml`;
  const response = await fetch(url); // テストデータ
  // const response = await fetch(`https://www.data.jma.go.jp/developer/xml/data/${id}.xml`); // 送られてきたidのXML
  
  if (!response.ok) {
    return new Response(JSON.stringify({ message: `データにアクセスできません。${url}` }), { status: 400 });
  }
  const xml = await response.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const content = await parser.parseStringPromise(xml);
  return NextResponse.json({content});
}