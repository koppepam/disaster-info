import * as xml2js from 'xml2js';
import FormattedTime from '@/components/FormattedTime';
import { EntriesProps, Entry } from '@/components/types/types';

import IntensityReport from '@/components/detail-case/IntensityReport';
import EpicenterInfo from '@/components/detail-case/EpicenterInfo';

// ({ feedtype, limit }: EntriesProps)

export default async function Entries({ limit }: EntriesProps) {
  const response = await fetch(`https://www.data.jma.go.jp/developer/xml/feed/eqvol_l.xml`);
  // const response = await fetch(`https://koppepam.github.io/disaster-info-data/eqvol.xml`) // 地震データ
  const xml = await response.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const { feed } = await parser.parseStringPromise(xml);

  const entries: Entry[] = feed.entry; 
  if(limit){
    entries.length = limit;
  }
  // console.dir(feed, { depth: null});
  return ( 
    <main>
      {entries.map(async(entry, i) => {
        const response = await fetch(entry.id); // 詳細XML

        if (!response.ok) {
          return (
            <ul>
              <li>{response.status}</li>
              <li>{response.statusText}</li>
              <li>{entry.id}</li>
            </ul>
          );
        }

        const xml = await response.text();
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(xml);

        const fs = await import('node:fs/promises');
        await fs.writeFile(`tmp/detail-${i}.json`, JSON.stringify(result, null, 2));

        // console.dir(result, { depth: null});

        switch (entry.title) {
          case '震度速報':
            return (
              <div className='border-b border-blue-900 mx-10 py-5'>
                <FormattedTime time={entry.updated} format='YYYY/MM/DD HH:mm:ss' />
                <span>{entry.content._}</span>
                <div className='flex flex-row flex-wrap text-gray-700'>
                  <IntensityReport url={entry.id} result={result} />
                </div>
              </div>
            )
          case '震源に関する情報':
            return (
              <div className='border-b border-blue-900 mx-10 py-5'>
                <FormattedTime time={entry.updated} format='YYYY/MM/DD HH:mm:ss' />
                <span>{entry.content._}</span>
                <div className='text-gray-700'>
                  <EpicenterInfo url={entry.id} result={result} />
                </div>
              </div>
            )
          // case '震源・震度に関する情報':
            // ...
          // case '顕著な地震の震源要素更新のお知らせ':
            // ...
          // case '長周期地震動に関する観測情報':
            // ...
          // case '津波警報・注意報・予報a':
            // ...
          // case '津波情報a':
            // ...
          // case '沖合の津波観測に関する情報':
            // ...
          // case '台風の暴風域に入る確率':
            // ...
          // case '台風解析・予報情報（５日予報）（Ｈ３０）':
            // ...
          default:
            return <></>
        }

        /* if (earthquakeInfo) {
          let cities;
          if (Array.isArray(result.Report.Body.Intensity.Observation.Pref)){
            const prefs = result.Report.Body.Intensity.Observation.Pref.map((pref: Pref) => {
              if (Array.isArray(pref.Area)) {
                const areas = pref.Area.map((area: Area) => {
                  const _cities = Array.isArray(area.City) ? area.City : [ area.City ];
                  cities = _cities.map((city : City) => {
                    try { return {name: city.Name, maxInt: parseInt(city.MaxInt, 10)} }
                    catch (e) { console.log('area => ' ,area) }
                    // return (
                    //   <li>
                    //     <span>{city.Name} 震度 </span>
                    //     <span>{city.MaxInt}</span>
                    //   </li>
                    // )
                  })
                })
              } else {
                const _cities = Array.isArray(pref.Area.City) ? pref.Area.City : [ pref.Area.City ];
                cities = _cities.map((city: City) => {
                  return {name: city.Name, maxInt: parseInt(city.MaxInt, 10)}
                  // return (
                  //   <li>
                  //     <span>{city.Name} 震度 </span>
                  //     <span>{city.MaxInt}</span>
                  //   </li>
                  // )
                });
              }
            })
          } else {
            const pref = result.Report.Body.Intensity.Observation.Pref
            if (Array.isArray(pref.Area)) {
              const areas = pref.Area.map((area: Area) => {
                cities = (area.City as City[]).map((city : City) => {
                  return {name: city.Name, maxInt: parseInt(city.MaxInt, 10)}
                  // return (
                  //   <li>
                  //     <span>{city.Name} 震度 </span>
                  //     <span>{city.MaxInt}</span>
                  //   </li>
                  // )
                })
              })
            } else {
              const _cities = Array.isArray(pref.Area.City) ? pref.Area.City : [ pref.Area.City ];
              cities = _cities.map((city: City) => {
                try { return {name: city.Name, maxInt: parseInt(city.MaxInt, 10)} }
                catch (e) { console.log('pref.Area => ', pref.Area) }
                // return (
                //   <li>
                //     <span>{city.Name} 震度 </span>
                //     <span>{city.MaxInt}</span>
                //   </li>
                // )
              });
            }
          }
          return (
            <div key={entry.id}>
              <ul>
                <li><FormattedTime time={entry.updated} format='YYYY/MM/DD HH:mm:ss' /></li>
                <li>{entry.content._}</li>
                <li>震源地 : {result.Report.Body.Earthquake.Hypocenter.Area.Name}</li>
                <li>{result.Report.Body.Intensity.Observation.Pref.Name}</li>
                <li>
                  <ol>{cities}</ol>
                </li>
                <li></li>
              </ul>
            </div>
          );
        } */
      })}
    </main>
  )
}