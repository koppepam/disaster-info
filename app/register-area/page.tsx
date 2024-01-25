import fs from 'fs';

type Group = {
  groupName: string;
  group: string[][];
};

export default function Page() {
  const earthquakeArea = fs.readFileSync('./public/data/earthquake-area.json', 'utf-8');
  const earthquakeAreaJson: Group[] = JSON.parse(earthquakeArea);
  const earthquakeGroups = earthquakeAreaJson.map((group, i) => {
    const earthquakeAreas = group.group.map((value, i) => {
      return (
        <li key={value[0]}>
          <label>
            <input type='checkbox' value={value[0]}/>{value[1]}
          </label>
        </li>
      );
    });
    return (
      <>
        <button id={`dropdownDefaultButton1-${i}`} data-dropdown-trigger="click" data-dropdown-toggle={`dropdown1-${i}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          {group.groupName}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        <div id={`dropdown1-${i}`} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownDefaultButton1-${i}`}>{earthquakeAreas}</ul>
        </div>
      </>
    );
  });

  const tsunamiArea = fs.readFileSync('./public/data/tsunami-area.json', 'utf-8');
  const tsunamiAreaJson: Group[] = JSON.parse(tsunamiArea);
  const tsunamiGroups = tsunamiAreaJson.map((group, i) => {
    const tsunamiAreas = group.group.map((value, i) => {
      return (
        <li key={value[0]}>
          <label>
            <input type='checkbox' value={value[0]}/>{value[1]}
          </label>
        </li>
      );
    });
    return (
      <>
        <button id={`dropdownDefaultButton2-${i}`} data-dropdown-trigger="click" data-dropdown-toggle={`dropdown2-${i}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          {group.groupName}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        <div id={`dropdown2-${i}`} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownDefaultButton2-${i}`}>{tsunamiAreas}</ul>
        </div>
      </>
    );
  });

  const tyhoonArea = fs.readFileSync('./public/data/tyhoon-area.json', 'utf-8');
  const tyhoonAreaJson: Group[] = JSON.parse(tyhoonArea);
  const tyhoonGroups = tyhoonAreaJson.map((group, i) => {
    const tyhoonAreas = group.group.map((value, i) => {
      return (
        <li key={value[0]}>
          <label>
            <input type='checkbox' value={value[0]}/>{value[1]}
          </label>
        </li>
      );
    });
    return (
      <>
        <button id={`dropdownDefaultButton3-${i}`} data-dropdown-trigger="click" data-dropdown-toggle={`dropdown3-${i}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          {group.groupName}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        <div id={`dropdown3-${i}`} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownDefaultButton3-${i}`}>{tyhoonAreas}</ul>
        </div>
      </>
    );
  });


  return (
    <form action="/" method="post">
      <h3>災害情報を受け取る地域を選択してください</h3>
      <div>
        <h5>地震</h5>
        {earthquakeGroups}
      </div>
      <div>
        <h5>津波</h5>
        {tsunamiGroups}
      </div>
      <div>
        <h5>台風</h5>
        {tyhoonGroups}
      </div>
    </form>
  );
}