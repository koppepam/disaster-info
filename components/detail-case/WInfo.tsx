// entry.title => 震源・震度に関する情報 のとき
 
import type { Pref, Root, Area3, City } from '@/components/types/detailTyps';

export default function WInfo ({result, url}: {result: Root, url:string}) {
  if (result.Report.Head.InfoType === '取消') {
    return <>取消された情報 : {url}</>
  } 
  const centerArea = result.Report.Body.Earthquake.Hypocenter.Area;
  const centerArray = Array.isArray(centerArea['jmx_eb:Coordinate']) ? centerArea['jmx_eb:Coordinate'][1] : centerArea['jmx_eb:Coordinate'];
  const pref = result.Report.Body.Intensity?.Observation?.Pref;
  const prefsArray = pref ? (Array.isArray(pref) ? pref : [ pref ]) : [];
  const prefs = prefsArray.map((pref: Pref, prefIndex) => {
    const areasArray = Array.isArray(pref.Area) ? pref.Area : [ pref.Area ];
    return areasArray.map((area: Area3, areaIndex) => {
      const citiesArray = Array.isArray(area.City) ? area.City : [ area.City ];
      return citiesArray.map((city : City, cityIndex) => {
        return <div key={`Winfo-${prefIndex}-${areaIndex}-${cityIndex}`} className='mx-5 mt-2'>{city.Name} : 震度 {area.MaxInt ?? '震度情報なし'}</div>
      });
    });
  });
  const forecastComment = result.Report.Body.Comments?.ForecastComment?.Text;
  const freeFormComment = result.Report.Body.Comments?.FreeFormComment;

  return (
    <div>
      <div className='ml-5'>震源地 : {result.Report.Body.Earthquake.Hypocenter.Area.Name}</div>
      <div className='ml-5'>{centerArray.$.description}</div>
      <div className='ml-5'>{result.Report.Body.Earthquake['jmx_eb:Magnitude'].$.description}</div>
      {prefs.length ? (
        <div className='flex flex-row flex-wrap text-gray-700'>{prefs}</div>
      ) : (
        <div className='ml-5 mt-2 text-gray-700'>震度情報なし</div>
      )}
      {forecastComment && <div className='ml-5 mt-2 whitespace-pre-wrap text-gray-700'>{forecastComment}</div>}
      {freeFormComment && <div className='ml-5 mt-2 whitespace-pre-wrap text-gray-700'>{freeFormComment}</div>}
    </div>
  )
}
