import { NextRequest, NextResponse } from "next/server";
import * as xml2js from 'xml2js';

export async function GET(request: NextRequest) {
  const response = await fetch(`https://koppepam.github.io/disaster-info-data/eqvol.xml`); // テストデータ
  const xml = await response.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const { feed } = await parser.parseStringPromise(xml);

  const updateTime = feed.updated;

  return NextResponse.json({updateTime});
}