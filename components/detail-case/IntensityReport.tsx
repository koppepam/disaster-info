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
  /* 震度降順にしたかった
  const order = ['7', '6+', '6-', '5+', '5-', '4', '3', '2', '1'];
  const maxIntSort = Array.isArray(pref.Area.MaxInt) ? pref.Area.MaxInt : [ pref.Area.MaxInt ];
  maxIntSort.sort((a,b) => {
    return order.indexOf(a.maxInt) - order.indexOf(b.maxInt);
  });
  console.log(maxIntSort);
  */
  const prefsArray = Array.isArray(pref) ? pref : [ pref ];
  const prefs = prefsArray.map((pref: Pref) => {
    const areasArray = Array.isArray(pref.Area) ? pref.Area : [ pref.Area ];
    const areas = areasArray.map((area: Area) => {
      return (
        <div className='mx-5 mt-2'>
          <span>{area.Name} : 震度 {area.MaxInt ?? '震度情報なし'}</span>
        </div>
      )
    });
    return areas;
  });
  return prefs;
}