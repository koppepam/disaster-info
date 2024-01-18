// entry.title => 長周期地震動に関する観測情報 のとき
 
import type { Pref, Root, Area } from '@/components/types/detailTyps';
import { renderToStaticMarkup } from 'react-dom/server';

export default function LPGMInfo ({result, url}: {result: Root, url:string}) {
  const pref = result.Report.Body.Intensity.Observation.Pref;
  const prefsArray = Array.isArray(pref) ? pref : [ pref ];
  const prefs = prefsArray.map((pref: Pref) => {
    const areasArray = Array.isArray(pref.Area) ? pref.Area : [ pref.Area ];
    const areas = areasArray.map((area) => {
      return (
        <div className='detail mx-5 mt-2'>
          <span>{area.Name} : 階級{area.MaxLgInt ?? '震度情報なし'}</span>
        </div>
      )
    });
    return areas;
  });
  return prefs;
}