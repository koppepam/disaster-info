type Data = {
  areaId: number;
  userId: string;
  areaCode: string;
  areaName: string;
  disaster: string;
};

export default async function RegisteredArea () {
  const response = await fetch('https://disaster-info-6cpa.onrender.com/api/registered-areas'); 
    const registeredData: Data[] = await response.json();
  
    const disasterMap = new Map(
      [
        ['earthquakeAreas', '地震'],
        ['tsunamiAreas', '津波'],
        ['tyhoonAreas', '台風'],
      ]
    );
    return (
      <div>
        <span>登録済みの地域</span>
        <ul>
          {
            registeredData.map((data) => {
              return (
                <li>{disasterMap.get(data.disaster)} : {data.areaName}</li>
              )
            })
          }
        </ul>
      </div>
    )
}