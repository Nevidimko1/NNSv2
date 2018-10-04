import { IBase, Base } from '../base.model';

export interface IUnitType extends IBase {
    industryId: number;
    classId: number;
    kind: string;
    industryName: string;
    className: string;
    symbol: string;
    needTechnology: boolean;
    laborMax: number;
    equipmentMax: number;
    square: number;
    buildingTime: number;
}

export class UnitType extends Base {
    constructor(protected _data: IUnitType) {
        super(_data);
    }

    get industryId(): number        { return this._data.industryId; }
    get classId(): number           { return this._data.classId; }
    get kind(): string              { return this._data.kind; }
    get industryName(): string      { return this._data.industryName; }
    get className(): string         { return this._data.className; }
    get symbol(): string            { return this._data.symbol; }
    get needTechnology(): boolean   { return this._data.needTechnology; }
    get laborMax(): number          { return this._data.laborMax; }
    get equipmentMax(): number      { return this._data.equipmentMax; }
    get square(): number            { return this._data.square; }
    get buildingTime(): number      { return this._data.buildingTime; }
}
