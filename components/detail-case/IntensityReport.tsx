// entry.title => 震度速報 のとき
 
import type { Pref, Area, City } from '@/components/types/types';
import type { Root } from '@/components/types/detailTyps';

export default function IntensityReport ({result}: {result: Root}) {
  let cities;
  if (Array.isArray(result.Report.Body.Intensity.Observation.Pref)){ // Pref 複数のとき
    const prefs = result.Report.Body.Intensity.Observation.Pref.map((pref: Pref) => {
      if (Array.isArray(pref.Area)) { // Area 複数のとき
        const areas = pref.Area.map((area: Area) => {
          const _cities = Array.isArray(area.City) ? area.City : [ area.City ]; // city 配列
          cities = _cities.map((city: City) => {
            return {name: city.Name, maxInt: parseInt(city.MaxInt, 10)}
          })
        })
      }
    })
  }
  console.log('cities => ', cities);
  return <></>
}