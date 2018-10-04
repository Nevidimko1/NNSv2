import { IBase, Base } from '../base.model';

export interface IUnitProduct extends IBase {
    symbol: string;
}

export class UnitProduct extends Base {
    constructor (protected _data: IUnitProduct) {
        super(_data);
    }

    get symbol(): string {
        return this._data.symbol;
    }
}
