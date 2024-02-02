

type Group = {
  groupName: string;
  group: string[][];
};


export default async function RegisterServer() {
  const earthquakeresponse = await fetch(`${process.env.URL}/data/earthquake-area.json`);
  const earthquakeAreaJson: Group[] = await earthquakeresponse.json();
  const earthquakeGroups = earthquakeAreaJson.map((group, i) => {
    const earthquakeAreas = group.group.map((value, i) => {
      return (
        <li key={value[0]}>
          <label>
            <input id={`earthquake${i}`} name='earthquakeAreas' type='checkbox' value={value[0]} />{value[1]}
          </label>
        </li>
      );
    });
    return (
      <div key={group.groupName}>
        <button id={`dropdownDefaultButton1-${i}`} data-dropdown-trigger="click" data-dropdown-toggle={`dropdown1-${i}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          {group.groupName}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        <div id={`dropdown1-${i}`} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownDefaultButton1-${i}`}>{earthquakeAreas}</ul>
        </div>
      </div>
    );
  });

  const tsunamiresponse = await fetch(`${process.env.URL}/data/tsunami-area.json`);
  const tsunamiAreaJson: Group[] = await tsunamiresponse.json();
  const tsunamiGroups = tsunamiAreaJson.map((group, i) => {
    const tsunamiAreas = group.group.map((value, i) => {
      return (
        <li key={value[0]}>
          <label>
            <input id={`tsunami${i}`} name='tsunamiAreas' type='checkbox' value={value[0]} />{value[1]}
          </label>
        </li>
      );
    });
    return (
      <div key={group.groupName}>
        <button id={`dropdownDefaultButton2-${i}`} data-dropdown-trigger="click" data-dropdown-toggle={`dropdown2-${i}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          {group.groupName}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        <div id={`dropdown2-${i}`} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownDefaultButton2-${i}`}>{tsunamiAreas}</ul>
        </div>
      </div>
    );
  });

  const tyhoonresponse = await fetch(`${process.env.URL}/data/tyhoon-area.json`);
  const tyhoonAreaJson: Group[] = await tyhoonresponse.json();
  const tyhoonGroups = tyhoonAreaJson.map((group, i) => {
    const tyhoonAreas = group.group.map((value, i) => {
      return (
        <li key={value[0]}>
          <label>
            <input id={`tyhoon${i}`} name='tyhoonAreas' type='checkbox' value={value[0]} />{value[1]}
          </label>
        </li>
      );
    });
    return (
      <div key={group.groupName}>
        <button id={`dropdownDefaultButton3-${i}`} data-dropdown-trigger="click" data-dropdown-toggle={`dropdown3-${i}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          {group.groupName}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        <div id={`dropdown3-${i}`} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownDefaultButton3-${i}`}>{tyhoonAreas}</ul>
        </div>
      </div>
    );
  });

  return (
      <div className='m-5'>
        <h5>地震</h5>
        <div className="flex">{earthquakeGroups}</div>
        <h5>津波</h5>
        <div className="flex">{tsunamiGroups}</div>
        <h5>台風</h5>
        <div className="flex">{tyhoonGroups}</div>
      </div>
  );
}