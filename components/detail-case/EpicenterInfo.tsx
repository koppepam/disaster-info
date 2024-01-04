// entry.title => 震源に関する情報 のとき

// import type {} from '@/components/types/types';
import type { Root } from '@/components/types/detailTyps';

export default function EpicenterInfo ({result}: {result: Root}) {
  return (
    <div>
      <div>震源地 : {result.Report.Body.Earthquake.Hypocenter.Area.Name}</div>
      <div>{result.Report.Body.Earthquake.Hypocenter.Area['jmx_eb:Coordinate'].$.description}</div>
    </div>
  );
}