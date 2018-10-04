import { IBase, Base } from '../base.model';

export interface IUnitIndicator extends IBase {
    kind: string;
}

export class UnitIndicator extends Base {
    constructor(protected _data: IUnitIndicator) {
        super(_data);
    }

    get kind(): string {
        return this._data.kind;
    }
}
