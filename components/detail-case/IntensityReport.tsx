// entry.title => 震度速報 のとき
 
import type { Pref, Root } from '@/components/types/detailTyps';
import { renderToStaticMarkup } from 'react-dom/server';

export default function IntensityReport ({result, url}: {result: Root, url:string}) {
  if (result.Report.Head.InfoType === '取消') {
    return <>取消された情報 : {url}</>
  } 
  const pref = result.Report.Body.Intensity.Observation.Pref;
  const prefsArray = Array.isArray(pref) ? pref : [ pref ];
  const prefs = prefsArray.map((pref: Pref) => {
    const areasArray = Array.isArray(pref.Area) ? pref.Area : [ pref.Area ];
    const areas = areasArray.map((area, i) => {
      return <div key={`Intensity-${i}`} className='detail mx-5 mt-2'>{area.Name} : 震度 {area.MaxInt ?? '震度情報なし'}</div>
    });
    return areas;
  });
  return prefs;
}