// entry.title => 津波警報・注意報・予報a のとき
 
import type { Pref, Root, Area, Item } from '@/components/types/detailTyps';
import { renderToStaticMarkup } from 'react-dom/server';

export default function TsunamiAlarm ({result, url}: {result: Root, url:string}) {
  const item = result.Report.Body.Tsunami.Forecast.Item;
  const itemsArray = Array.isArray(item) ? item : [ item ];
  const items = itemsArray.map((item: Item) => {
    return (
      <div className='mx-5 mt-2'>
        <span>{item.Area.Name} : {item.Category?.Kind.Name ?? ''}</span>
        {item.MaxHeight && ` : 津波の高さ${item.MaxHeight['jmx_eb:TsunamiHeight'].$.description}`}
      </div>
    )
  })
  return items;
}