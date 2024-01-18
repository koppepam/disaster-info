// entry.title => 台風の暴風域に入る確率 のとき

import type { Root, Item, Area, MeteorologicalInfo } from '@/components/types/detailTyps';

export default async function TyphoonProb ({result, url}: {result: Root, url:string}) {
  const MeteoInfos: MeteorologicalInfo = Array.isArray(result.Report.Body.MeteorologicalInfos.MeteorologicalInfo) ? result.Report.Body.MeteorologicalInfos.MeteorologicalInfo[1] : result.Report.Body.MeteorologicalInfos;

  // prefecture ごとにまとめる
  const itemsArray = Array.isArray(MeteoInfos.Item) ? MeteoInfos.Item : [ MeteoInfos.Item ];
  
  // 全国の確率が 0 のとき
  const Probability = itemsArray.map((item: Item) => {
    return item.Kind.Property.FiftyKtWindProbabilityPart.FiftyKtWindProbability._;
  });
  if (Probability.every((prob) => parseInt(prob, 10) === 0)) {
    return (
      <div className='mx-5 mt-2 text-gray-700'>
        <span>全域 : 0%</span>
      </div>
    );
  }

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

    const notZeroItemsArray /* ↑ の items(配列) のマップ */ = filteredItems.map((item: Item) => {
      const Probability = item.Kind.Property.FiftyKtWindProbabilityPart.FiftyKtWindProbability._;
      return (
        <div className='detail mx-2'>
          <span>{item.Area.Name} : </span>
          {`${Probability}%`}
        </div>
      );
    });
    if (notZeroItemsArray.length) {
      return (
        <div className='detail mx-5 mt-2 flex flex-row flex-wrap'>
          <span>{prefName} : </span>
          {notZeroItemsArray}
        </div>
      );
    }
  });
  return items;
}