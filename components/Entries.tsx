import * as xml2js from 'xml2js';
import FormattedTime from '@/components/FormattedTime';
import { EntriesProps, Entry } from '@/components/types/types';

import EntryCard from '@/components/EntryCard';
import IntensityReport from '@/components/detail-case/IntensityReport';
import EpicenterInfo from '@/components/detail-case/EpicenterInfo';
import WInfo from './detail-case/WInfo';
import UpdateInfo from './detail-case/UpdateInfo';
import LPGMInfo from './detail-case/LPGMInfo';
import TsunamiAlarm from './detail-case/TsunamiAlarm';
import TsunamiInfo from './detail-case/TsunamiInfo';
import CoastInfo from './detail-case/CoastInfo';
import TyphoonProb from './detail-case/TyphoonProb';

// ({ feedtype, limit }: EntriesProps)

export default async function Entries({ limit }: EntriesProps) {
  console.log('気象庁防災情報 XML 取得...');

  try {await fetch(`https://www.data.jma.go.jp/developer/xml/feed/eqvol_l.xml`)}
  catch (error) {
    console.error('Fetch Error:', error);
  }

  const response = await fetch(`https://www.data.jma.go.jp/developer/xml/feed/eqvol_l.xml`);
  // const response = await fetch(`https://koppepam.github.io/disaster-info-data/eqvol.xml`); // テストデータ
  const xml = await response.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const { feed } = await parser.parseStringPromise(xml);

  const entries: Entry[] = feed.entry; 
  if(limit){
    entries.length = limit;
  }
  return ( 
    <main className='flex flex-row flex-wrap justify-center mr-auto ml-auto'>
      {entries.map(async(entry, i) => {
        const response = await fetch(entry.id, {cache: "no-store" }); // 詳細XML

        if (!response.ok) {
          return (
            <ul key={i} className='border-b border-blue-900 mx-10 py-5'>
              <li key={i}>{response.status}</li>
              <li key={i}>{response.statusText}</li>
              <li key={i}>{entry.id}</li>
            </ul>
          );
        }

        const xml = await response.text();
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(xml);

        // console.dir(result, { depth: null});

        switch (entry.title) {
          case '震度速報':
            return (
              <EntryCard key={`entry-${i}`} title={entry.content._} time={entry.updated} index={i}>
                <div className='content flex flex-row flex-wrap text-gray-700'> 
                  <IntensityReport url={entry.id} result={result} />
                </div>
              </EntryCard>
            );
          case '震源に関する情報':
            return (
              <EntryCard key={`entry-${i}`} title={entry.content._} time={entry.updated} index={i}>
                <div className='content text-gray-700'>
                  <EpicenterInfo url={entry.id} result={result} />
                </div>
              </EntryCard>
            );
          case '震源・震度に関する情報':
            return (
              <EntryCard key={`entry-${i}`} title={entry.content._} time={entry.updated} index={i}>
                <div className='content'>
                  <WInfo url={entry.id} result={result} />
                </div>
              </EntryCard>
            );
          case '顕著な地震の震源要素更新のお知らせ':
            return (
              <EntryCard key={`entry-${i}`} title={entry.content._} time={entry.updated} index={i}>
                <div className='content text-gray-700'>
                  <UpdateInfo url={entry.id} result={result} />
                </div>
              </EntryCard>
            );
          case '長周期地震動に関する観測情報':
            return (
              <EntryCard key={`entry-${i}`} title={entry.content._} time={entry.updated} index={i}>
                <div className='content flex flex-row flex-wrap text-gray-700'>
                  <LPGMInfo url={entry.id} result={result} />
                </div>
                <span className='content'>{result.Report.Body.Comments.FreeFormComment}</span>
              </EntryCard>
            );
          case '津波警報・注意報・予報a':
            const canceled = /解除/;
            if (canceled.test(entry.content._)) {
              return (
                <EntryCard key={`entry-${i}`} title={entry.content._ + '以下は継続中です。'} time={entry.updated} index={i}>
                  <div className='flex flex-row flex-wrap text-gray-700'>
                    <TsunamiAlarm url={entry.id} result={result} />
                  </div>
                  <span>{result.Report.Body.Comments.WarningComment.Text}</span>
                </EntryCard>
              );
            }
            return (
              <EntryCard key={`entry-${i}`} title={entry.content._} time={entry.updated} index={i}>
                <div className='content flex flex-row flex-wrap text-gray-700'>
                  <TsunamiAlarm url={entry.id} result={result} />
                </div>
                <span className='content'>{result.Report.Body.Comments.WarningComment.Text}</span>
              </EntryCard>
            );
          case '津波情報a':
            return (
              <EntryCard key={`entry-${i}`} title={entry.content._} time={entry.updated} index={i}>
                <div className='content flex flex-row flex-wrap text-gray-700'>
                  <TsunamiInfo url={entry.id} result={result} />
                </div>
                <span className='content'>{result.Report.Body.Comments.WarningComment.Text}</span>
              </EntryCard>
            );
          case '沖合の津波観測に関する情報':
            return (
              <EntryCard key={`entry-${i}`} title={entry.content._} time={entry.updated} index={i}>
                <div className='content'>
                  <CoastInfo url={entry.id} result={result} />
                </div>
              </EntryCard>
            );
          case '台風の暴風域に入る確率':
            return (
              <EntryCard key={`entry-${i}`} title={`【${entry.title}】`} time={entry.updated} index={i}>
                <div className='content text-gray-700'>
                  <TyphoonProb url={entry.id} result={result} />
                </div>
              </EntryCard>
            );
          default:
            return <></>
        }
      })}
    </main>
  )
}