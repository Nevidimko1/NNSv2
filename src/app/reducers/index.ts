import { GlobalsReducer } from './globals.reducer';
import { globals, unitsTableColumnSettings, unitsList, unitsTable, price, supply } from '../shared/appState';
import { UnitsTableColumnSettingsReducer } from '../modules/unitsTable/unitsTableColumnSettings.reducer';
import { UnitsListReducer } from './unitsList.reducer';
import { UnitsTableReducer } from '../modules/unitsTable/unitsTable.reducer';
import { PriceReducer } from '../modules/toolbar/partials/price/price.reducer';
import { SupplyReducer } from '../modules/toolbar/partials/supply/supply.reducer';

export const Reducers = {
    [globals]: GlobalsReducer,
    [unitsList]: UnitsListReducer,
    [unitsTableColumnSettings]: UnitsTableColumnSettingsReducer,
    [unitsTable]: UnitsTableReducer,
    [price]: PriceReducer,
    [supply]: SupplyReducer
};
