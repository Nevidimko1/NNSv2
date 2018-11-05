import { IBase, Base } from '../base.model';
import { RetailProductReport } from '../retail/retailProductReport.model';

export interface IUnitProduct extends IBase {
    symbol: string;
    report?: RetailProductReport;
}

export class UnitProduct extends Base {
    constructor (protected _data: IUnitProduct) {
        super(_data);
    }

    set report(val: RetailProductReport)    { this._data.report = val; }

    get symbol(): string                    { return this._data.symbol; }
    get report(): RetailProductReport       { return this._data.report; }
}
