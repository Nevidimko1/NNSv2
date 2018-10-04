import { GlobalsReducer } from './globals.reducer';
import { globals, unitsTableColumnSettings, unitsList } from '../shared/appState';
import { UnitsTableColumnSettingsReducer } from '../modules/unitsTable/unitsTableColumnSettings.reducer';
import { UnitsListReducer } from './unitsList.reducer';

export const Reducers = {
    [globals]: GlobalsReducer,
    [unitsList]: UnitsListReducer,
    [unitsTableColumnSettings]: UnitsTableColumnSettingsReducer
};
