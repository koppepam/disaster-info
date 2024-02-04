import { NextRequest, NextResponse } from "next/server";
import * as xml2js from 'xml2js';

// export const runtime = 'edge';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const response = await fetch(`https://www.data.jma.go.jp/developer/xml/feed/eqvol.xml`, { cache: "no-store" }); // データ
  const xml = await response.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const { feed } = await parser.parseStringPromise(xml);

  return NextResponse.json({
    feed,
    accessTime: new Date().toISOString()},
    { headers: {
      'Cache-Control': 'no-store',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store'
    }
  });
}