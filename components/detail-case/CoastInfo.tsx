// entry.title =>  沖合の津波観測に関する情報 のとき => データなし

import type { Root } from '@/components/types/detailTyps';
import { renderToStaticMarkup } from 'react-dom/server';

export default function CoastInfo ({result, url}: {result: Root, url:string}) {
  return <>{url}</>
}