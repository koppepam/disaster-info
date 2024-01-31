// entry.title => 津波情報a のとき
 
import type { Root, Item, Station } from '@/components/types/detailTyps';

function Observation ({result, url}: {result: Root, url:string}) {
  const ObItem = result.Report.Body.Tsunami.Observation.Item;
  const ObItemsArray = Array.isArray(ObItem) ? ObItem : [ ObItem ];
  const ObItems = ObItemsArray.map((item: Item) => {
    const stationsArray = Array.isArray(item.Station) ? item.Station : [item.Station];
    const stations = stationsArray.map((station: Station) => {
      let maxHeight = '';
      if (station.MaxHeight['jmx_eb:TsunamiHeight']) {
        maxHeight = station.MaxHeight['jmx_eb:TsunamiHeight'].$.description;
      } else {
        maxHeight = station.MaxHeight.Condition;
      }
      return (
        <div className='mx-8 mt-2'>
          <span>{station.Name}</span>
          {station.MaxHeight && ` : これまでの最大波の高さ = ${maxHeight}`}
        </div>
      );
    })
    return (
      <div>
        <span>{item.Area.Name}</span>
        <span>{stations}</span>
      </div>
    );
  })
  return ObItems;
}

function Forecast ({result, url}: {result: Root, url:string}) {
  const FoItem = result.Report.Body.Tsunami.Forecast.Item;
  const FoItemsArray = Array.isArray(FoItem) ? FoItem : [ FoItem ];
  const FoItems = FoItemsArray.map((item: Item, i) => {
    return (
      <div key={`TInfo-${i}`}>
        <span>【{item.Area.Name}】 {item.Category?.Kind.Name ?? ''}</span>
        {item.MaxHeight && ` : 津波の高さ${item.MaxHeight['jmx_eb:TsunamiHeight'].$.description}`}
      </div>
    );
    })
  return FoItems;
}

export default function TsunamiInfo ({result, url}: {result: Root, url:string}) {
  if (result.Report.Body.Tsunami.Observation && result.Report.Body.Tsunami.Forecast) {
    return (
      <div className='detail mx-5 mt-2'>
        <Observation result={result} url={url}/>
        <div className='border-t border-red-500 flex flex-wrap'>
          <Forecast result={result} url={url}/>
        </div>
      </div>
    )
  } else if (result.Report.Body.Tsunami.Observation) {
    return (
      <div className='detail mx-5 mt-2'>
        <Observation result={result} url={url}/>
      </div>
    )
  } else if (result.Report.Body.Tsunami.Forecast) {
    return (
      <div className='detail mx-5 mt-2 flex flex-wrap'>
        <Forecast result={result} url={url}/>
      </div>
    )
  }
}