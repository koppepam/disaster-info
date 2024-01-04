// entry.title => 震度速報 のとき
 
// import type { Pref } from '@/components/types/types';
import type { Pref, Root, Area } from '@/components/types/detailTyps';
import { renderToStaticMarkup } from 'react-dom/server';

export default function IntensityReport ({result, url}: {result: Root, url:string}) {
  let cities;
  if (result.Report.Head.InfoType === '取消') {
    return <>取消された情報 : {url}</>
  } 
  const pref = result.Report.Body.Intensity.Observation.Pref;
  const prefsArray = Array.isArray(pref) ? pref : [ pref ];
  const prefs = prefsArray.map((pref: Pref) => {
    const areasArray = Array.isArray(pref.Area) ? pref.Area : [ pref.Area ];
    const areas = areasArray.map((area: Area) => {
      return (
        <div>
          <span>エリア: {area.Name} 震度 {area.MaxInt ?? '震度情報なし'}</span>
        </div>
      );
    });
    return areas;
  });
  return prefs;
}