import { IColumnData, Column } from './column.model';

export class ColumnSettings {
    private _columns: Column[];

    constructor(cols: IColumnData[]) {
        this._columns = cols.map(c => new Column(c));
    }

    get columns(): Column[] {
        return this._columns;
    }
}
