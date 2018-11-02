import { ColumnSettings } from '../../models/table/columnSettings.model';
import { IColumnData } from '../../models/table/column.model';

const defaultColumns: IColumnData[] = [
    {
        field: 'country',
        fieldToSort: 'countryName',
        name: 'C',
        title: 'Country',
        width: '38px',
        headerClass: 'text-center'
    },
    {
        field: 'cityName',
        fieldToSort: 'cityName',
        name: 'City',
        width: '100px'
    },
    {
        field: 'type',
        fieldToSort: 'unitTypeSymbol',
        name: 'T',
        title: 'Type',
        width: '36px',
        headerClass: 'text-center',
        class: 'p-0'
    },
    {
        field: 'name',
        fieldToSort: 'name',
        name: 'Name',
        width: null
    },
    {
        field: 'indicators',
        fieldToSort: 'indicators',
        name: 'Ind',
        width: '70px'
    },
    {
        field: 'productivity',
        fieldToSort: 'productivity',
        name: 'Eff',
        title: 'Efficiency',
        width: '50px',
        class: 'p-0 text-center'
    },
    {
        field: 'productivityTomorrow',
        fieldToSort: 'productivityTomorrow',
        name: 'EffT',
        title: 'Efficiency tomorrow',
        width: '50px',
        class: 'p-0 text-center'
    },
    {
        field: 'top1',
        fieldToSort: 'top1',
        name: 'TOP1',
        width: '60px',
        class: 'p-0 text-center'
    },
    {
        field: 'top3',
        fieldToSort: 'top3',
        name: 'TOP3',
        width: '60px',
        class: 'p-0 text-center'
    },
    {
        field: 'priceConfig',
        fieldToSort: 'priceConfig',
        name: 'Price',
        width: '65px'
    },
    {
        field: 'supplyConfig',
        fieldToSort: 'supplyConfig',
        name: 'Supply',
        width: '90px'
    },
    {
        field: 'status',
        fieldToSort: 'status',
        name: '',
        title: 'Status',
        width: '30px'
    }
];

export class UnitsTableColumnSettings extends ColumnSettings {
    constructor() {
        super(defaultColumns);
    }
}
