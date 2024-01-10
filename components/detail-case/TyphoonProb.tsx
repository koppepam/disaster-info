// entry.title => 台風の暴風域に入る確率 のとき

import 'core-js/full/map/group-by';
import type { Root, Item, Area, MeteorologicalInfo } from '@/components/types/detailTyps';

// // @ts-ignore
// if (!Array.prototype.groupToMap) {
//   Object.defineProperty(Array.prototype, 'groupToMap', {
//     // @ts-ignore
//     value: function (callback) {
//       // @ts-ignore
//       return this.reduce((map, element, index, array) => {
//         const key = callback(element, index, array);
//         const value = map.get(key);

//         if (value) value.push(element);
//         else map.set(key, [element]);

//         return map;
//       }, new Map());
//     }
//   });
// }

export default async function TyphoonProb ({result, url}: {result: Root, url:string}) {
  const MeteoInfos: MeteorologicalInfo = Array.isArray(result.Report.Body.MeteorologicalInfos.MeteorologicalInfo) ? result.Report.Body.MeteorologicalInfos.MeteorologicalInfo[1] : result.Report.Body.MeteorologicalInfos;
  
  // prefecture ごとにまとめる
  const itemsArray = Array.isArray(MeteoInfos.Item) ? MeteoInfos.Item : [ MeteoInfos.Item ];

  const InfoitemsMap = itemsArray.reduce((map, item, index ) => {
    const key = item.Area.Prefecture;
    const group = map.get(key);
    if (group) group.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map());

  // [
  //   [ '東京都', [{}, {}, {}, {} ] ],
  //   [ '神奈川県', [{}, {}, {}, {} ] ],
  //   [ '千葉県', [{}, {}, {}, {} ] ],
  // ].map(([prefName, items]) => {
  const items = (Array.from(InfoitemsMap) as [string, Item[]][]).map(([prefName, items]) => {
    const filteredItems = items.filter((item: Item) => {
      const Probability = item.Kind.Property.FiftyKtWindProbabilityPart.FiftyKtWindProbability._;
      return parseInt(Probability, 10) !== 0;
    });
    const itemsArray /* ↑ の items(配列) のマップ */ = filteredItems.map((item: Item) => {
      const Probability = item.Kind.Property.FiftyKtWindProbabilityPart.FiftyKtWindProbability._;
      if (parseInt(Probability, 10) !== 0) {
        return (
          <div className='mx-8 mt-2 flex flex-row flex-wrap'>
            <span>{item.Area.Name} : </span>
            {`${Probability}%`}
          </div>
        );
      } else {
        return null;
      }
    });
    if (itemsArray.length) {
      return (
        <div className='mx-5 mt-2'>
          <span>{prefName} : </span>
          {itemsArray}
        </div>
      );
    }
  });
  return items;
}