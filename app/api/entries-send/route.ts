import { NextRequest, NextResponse } from "next/server";
import * as xml2js from 'xml2js';
import { Entry } from '@/components/types/types';

export async function GET(request: NextRequest) {
  const response = await fetch(`https://koppepam.github.io/disaster-info-data/eqvol.xml`); // テストデータ
  const xml = await response.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const { feed } = await parser.parseStringPromise(xml);

  const entries: Entry[] = feed.entry; 
  
  const content = await Promise.all(entries.map(async(entry, i) => {
    const response = await fetch(entry.id, {cache: "no-store" }); // 詳細XML

    if (!response.ok) {
      return null;
    }

    const xml = await response.text();
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xml);
    return result;
  }));
  return NextResponse.json({content});
}