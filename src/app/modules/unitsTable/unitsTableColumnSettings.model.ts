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
        fieldToSort: 'type',
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
        class: ''
    },
    {
        field: 'indicators',
        fieldToSort: 'indicators',
        name: 'Ind',
        width: '70px',
        class: 'b-right'
    },
    {
        field: 'productivity',
        fieldToSort: 'productivity',
        name: 'Eff',
        title: 'Efficiency',
        width: '50px',
        class: 'b-right p-0 text-center'
    },
    {
        field: 'productivityTomorrow',
        fieldToSort: 'productivityTomorrow',
        name: 'EffT',
        title: 'Efficiency tomorrow',
        width: '50px',
        class: 'b-right p-0 text-center'
    },
    {
        field: 'size',
        fieldToSort: 'size',
        name: 'Size',
        width: '50px',
        class: 'b-right'
    }
];

export class UnitsTableColumnSettings extends ColumnSettings {
    constructor() {
        super(defaultColumns);
    }
}
