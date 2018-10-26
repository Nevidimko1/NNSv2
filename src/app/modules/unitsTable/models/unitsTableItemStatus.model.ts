export class IUnitsTableItemStatus {
    protected _inProgress = false;
}

export class UnitsTableItemStatus extends IUnitsTableItemStatus {
    constructor(data: IUnitsTableItemStatus = new IUnitsTableItemStatus()) {
        super();

        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    set inProgress(val: boolean)    { this._inProgress = val; }
    get inProgress(): boolean       { return this._inProgress; }
}
