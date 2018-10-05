import { IGlobalsState } from '../reducers/globals.reducer';
import { UnitsTableColumnSettings } from '../modules/unitsTable/unitsTableColumnSettings.model';
import { UnitsListState } from '../reducers/unitsList.reducer';
import { UnitsTableState } from '../modules/unitsTable/unitsTable.reducer';
import { PriceState } from '../modules/toolbar/partials/price/price.reducer';
import { SupplyState } from '../modules/toolbar/partials/supply/supply.reducer';

export const globals = 'globals';
export const unitsList = 'unitsList';
export const unitsTableColumnSettings = 'unitsTableColumnSettings';

export const unitsTable = 'unitsTable';

export const price = 'price';
export const supply = 'supply';

export interface AppState {
    globals: IGlobalsState;
    unitsList: UnitsListState;
    unitsTableColumnSettings: UnitsTableColumnSettings;

    unitsTable: UnitsTableState;

    price: PriceState;
    supply: SupplyState;
}
