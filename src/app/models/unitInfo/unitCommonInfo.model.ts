export interface IUnitCommonInfo {
    top1: number;
    top3: number;
}

export class UnitCommonInfo {
    constructor(private _data: IUnitCommonInfo = {
        top1: null,
        top3: null
    }) { }

    get data(): IUnitCommonInfo             { return this._data; }

    get top1(): number                      { return this._data.top1; }
    get top3(): number                      { return this._data.top3; }
}
