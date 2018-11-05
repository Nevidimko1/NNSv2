export interface ICityData {
    id: number;
    regionId: number;
    countryId: number;
    regionName: string;
    countryName: string;
    level: number;
    population: number;
    ploughField: number;
    salary: number;
    unemployment: number;
    education: number;
    x: number;
    y: number;
    status: number;
    wealthLevel: number;
    countrySymbol: string;
    cityId: number;
    cityName: string;
    noviceShield: number;
    restrictions: string;
    restrictionsCount: number;
    retails: string;
    retailCount: number;
    intellectualsCost: number;
    merchantsCost: number;
    workersCost: number;
    mayor: any;
}

export class City {
    constructor(private _data: ICityData) { }

    get id(): number                    { return this._data.id; }
    get regionId(): number              { return this._data.regionId; }
    get countryId(): number             { return this._data.countryId; }
    get regionName(): string            { return this._data.regionName; }
    get countryName(): string           { return this._data.countryName; }
    get level(): number                 { return this._data.level; }
    get population(): number            { return this._data.population; }
    get ploughField(): number           { return this._data.ploughField; }
    get salary(): number                { return this._data.salary; }
    get unemployment(): number          { return this._data.unemployment; }
    get education(): number             { return this._data.education; }
    get x(): number                     { return this._data.x; }
    get y(): number                     { return this._data.y; }
    get status(): number                { return this._data.status; }
    get wealthLevel(): number           { return this._data.wealthLevel; }
    get countrySymbol(): string         { return this._data.countrySymbol; }
    get cityId(): number                { return this._data.cityId; }
    get cityName(): string              { return this._data.cityName; }
    get noviceShield(): number          { return this._data.noviceShield; }
    get restrictions(): string          { return this._data.restrictions; }
    get restrictionsCount(): number     { return this._data.restrictionsCount; }
    get retails(): string               { return this._data.retails; }
    get retailCount(): number           { return this._data.retailCount; }
    get intellectualsCost(): number     { return this._data.intellectualsCost; }
    get merchantsCost(): number         { return this._data.merchantsCost; }
    get workersCost(): number           { return this._data.workersCost; }
    get mayor(): any                    { return this._data.mayor; }
}
