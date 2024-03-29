export type Root = {
  Report: Report
}

export type Report = {
  $: GeneratedType
  Control: Control
  Head: Head
  Body: Body
}

export type GeneratedType = {
  xmlns: string
  "xmlns:jmx": string
}

export type Control = {
  Title: string
  DateTime: string
  Status: string
  EditorialOffice: string
  PublishingOffice: string
}

export type Head = {
  $: GeneratedType2
  Title: string
  ReportDateTime: string
  TargetDateTime: string
  EventID: string
  InfoType: string
  Serial: string
  InfoKind: string
  InfoKindVersion: string
  Headline: Headline
}

export type GeneratedType2 = {
  xmlns: string
}

export type Headline = {
  Text: string
  Information: Information[]
}

export type Information = {
  $: GeneratedType3
  Item: Item | Item[]
}

export type GeneratedType3 = {
  type: string
}

export type Item = {
  Kind: Kind
  Areas: Areas
  Area: Area
  Category: Category
  MaxHeight?: MaxHeight
  Station: Station
}

export type Kind = {
  Name: string
  Property: Property
}

export type Property = {
  Code: string
  Name: string
  Value: string
  FiftyKtWindProbabilityPart: FiftyKtWindProbabilityPart
}

export type FiftyKtWindProbabilityPart = {
  FiftyKtWindProbability: FiftyKtWindProbability
}

export type FiftyKtWindProbability = {
  _: string
}

export type Areas = {
  $: GeneratedType4
  Area: Area
}

export type GeneratedType4 = {
  codeType: string
}

export type Area = {
  Prefecture: string
  Name: string
  Code: string
  MaxInt?: string
  MaxLgInt?: string
  Category?: Category
}

export type Body = {
  $: GeneratedType5
  Earthquake: Earthquake
  Intensity: Intensity
  Comments: Comments
  Tsunami: Tsunami
  MeteorologicalInfos: MeteorologicalInfos
}

export type MeteorologicalInfos = {
  MeteorologicalInfo: MeteorologicalInfo
}

export type MeteorologicalInfo = {
  Item: Item
}

export type GeneratedType5 = {
  xmlns: string
  "xmlns:jmx_eb": string
}

export type Tsunami = {
  Forecast: Forecast
  Observation: Observation
}

export type Forecast = {
  Item: Item
}

export type Observation = {
  Item: Item
  Pref: Pref
}

export type Category = {
  Kind: Kind
}

export type MaxHeight = {
  "jmx_eb:TsunamiHeight": JmxEbTsunamiHeight
  Condition: string
}

export type Station = {
  Name: string
  MaxHeight: MaxHeight
}

export type Kind = {
  Name: string
}

export type JmxEbTsunamiHeight = {
  _: string
  $: GeneratedType8
}

export type Earthquake = {
  OriginTime: string
  ArrivalTime: string
  Hypocenter: Hypocenter
  "jmx_eb:Magnitude": JmxEbMagnitude
}

export type Hypocenter = {
  Area: Area2
}

export type Area2 = {
  Name: string
  Code: Code
  "jmx_eb:Coordinate": JmxEbCoordinate | JmxEbCoordinate[]
}

export type Code = {
  _: string
  $: GeneratedType6
}

export type GeneratedType6 = {
  type: string
}

export type JmxEbCoordinate = {
  _: string
  $: GeneratedType7
}

export type GeneratedType7 = {
  description: string
  datum: string
}

export type JmxEbMagnitude = {
  _: string
  $: GeneratedType8
}

export type GeneratedType8 = {
  type: string
  description: string
}

export type Intensity = {
  Observation: Observation
}

export type Observation = {
  CodeDefine: CodeDefine
  MaxInt: string
  Pref: Pref
}

export type CodeDefine = {
  Type: Type[]
}

export type Type = {
  _: string
  $: GeneratedType9
}

export type GeneratedType9 = {
  xpath: string
}

export type Pref = {
  Name: string
  Code: string
  MaxInt: string
  Area: Area3 | Area3[]
}

export type Area3 = {
  Name: string
  Code: string
  MaxInt: string
  City: City[]
  MaxLgInt?: string
}

export type City = {
  Name: string
  Code: string
  MaxInt: string
  IntensityStation: any
}

export type Comments = {
  ForecastComment: ForecastComment
  VarComment: VarComment
  FreeFormComment: string
}

export type ForecastComment = {
  $: GeneratedType10
  Text: string
  Code: string
}

export type GeneratedType10 = {
  codeType: string
}

export type VarComment = {
  $: GeneratedType11
  Text: string
  Code: string
}

export type GeneratedType11 = {
  codeType: string
}