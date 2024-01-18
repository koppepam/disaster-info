// entry.title => 震源に関する情報 のとき => データなし

// import type {} from '@/components/types/types';
import type { Root } from '@/components/types/detailTyps';

export default function EpicenterInfo ({result, url}: {result: Root, url:string}) {
  const centerArea = result.Report.Body.Earthquake.Hypocenter.Area;
  const centerArray = Array.isArray(centerArea['jmx_eb:Coordinate']) ? centerArea['jmx_eb:Coordinate'][1] : centerArea['jmx_eb:Coordinate'];
  return (
    <div>
      <div className='detail mx-5 mt-2 flex'>
        <div>震源地 : {result.Report.Body.Earthquake.Hypocenter.Area.Name}</div>
        <div className='ml-5'>{centerArray.$.description}</div>
      </div>
      <div className='ml-5'>{result.Report.Body.Earthquake['jmx_eb:Magnitude'].$.description}</div>
    </div>
  );
}