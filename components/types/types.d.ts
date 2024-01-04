export type EntriesProps = {
  // feedtype: 'extra' | 'eqvol';
  limit?: number;
};

export type ResultProps = {
  result: object;
}

export type Entry = {
  id: string
  infokindversion: string
  updated: string
  title: string
  content: {
    _: string
  }
}

export type Pref = {
  Name: string
  Area: Area[] | Area
}

export type Area = {
  Area: Area[] | Area
  City: City[] | City
}

export type City = {
  Name: string
  MaxInt: string
}