import { NextRequest, NextResponse } from "next/server";
import * as xml2js from 'xml2js';

export async function GET(request: NextRequest) {
  const response = await fetch(`https://www.data.jma.go.jp/developer/xml/feed/eqvol_l.xml`); // データ
  const xml = await response.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const { feed } = await parser.parseStringPromise(xml);

  return NextResponse.json({feed});
}