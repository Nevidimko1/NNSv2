export class IUnitForecast {
    employeeProductivity: number;
    equipmentProductivity: number;
    loading: number;
    managerProductivity: number;
    officeProductivity: number;
    power: number;
    productivity: number;
    turnId: number;
    unitComplexity: number;
    unitId: number;
}

export class UnitForecast {
    constructor(private _data: IUnitForecast) { }

    get employeeProductivity(): number		{ return this._data.employeeProductivity; }
    get equipmentProductivity(): number		{ return this._data.equipmentProductivity; }
    get loading(): number		            { return this._data.loading; }
    get managerProductivity(): number		{ return this._data.managerProductivity; }
    get officeProductivity(): number		{ return this._data.officeProductivity; }
    get power(): number		                { return this._data.power; }
    get productivity(): number		        { return this._data.productivity; }
    get turnId(): number		            { return this._data.turnId; }
    get unitComplexity(): number		    { return this._data.unitComplexity; }
    get unitId(): number		            { return this._data.unitId; }
}
