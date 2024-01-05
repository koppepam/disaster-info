// entry.title => 震源に関する情報 のとき

// import type {} from '@/components/types/types';
import type { Root } from '@/components/types/detailTyps';

export default function EpicenterInfo ({result, url}: {result: Root, url:string}) {
  return (
    <div className='mx-5 mt-2 flex'>
      <div>震源地 : {result.Report.Body.Earthquake.Hypocenter.Area.Name}</div>
      <div className='ml-5'>{result.Report.Body.Earthquake.Hypocenter.Area['jmx_eb:Coordinate'].$.description}</div>
    </div>
  );
}