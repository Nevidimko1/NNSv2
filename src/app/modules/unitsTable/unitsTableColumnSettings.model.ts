import { ColumnSettings } from '../../models/table/columnSettings.model';
import { IColumnData } from '../../models/table/column.model';

const defaultColumns: IColumnData[] = [
    {
        field: 'country',
        fieldToSort: 'countryName',
        name: 'C',
        title: 'Country',
        width: '38px',
        headerClass: 'text-center',
        class: 'b-right'
    },
    {
        field: 'cityName',
        fieldToSort: 'cityName',
        name: 'City',
        width: '100px',
        class: 'b-right'
    },
    {
        field: 'type',
        fieldToSort: 'unitTypeSymbol',
        name: 'T',
        title: 'Type',
        width: '36px',
        headerClass: 'text-center',
        class: 'b-right p-0'
    },
    {
        field: 'name',
        fieldToSort: 'name',
        name: 'Name',
        width: null,
        class: 'b-right'
    },
    {
        field: 'productivity',
        fieldToSort: 'productivity',
        name: 'Eff',
        width: '44px',
        class: 'b-right p-0 text-center'
    }
];

export class UnitsTableColumnSettings extends ColumnSettings {
    constructor() {
        super(defaultColumns);
    }
}
