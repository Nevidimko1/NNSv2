import { GlobalsReducer } from './GlobalsReducer';
import { globals, unitsTableColumnSettings } from '../shared/appState';
import { UnitsTableColumnSettingsReducer } from '../modules/unitsTable/unitsTableColumnSettings.reducer';

export const Reducers = {
    [globals]: GlobalsReducer,
    [unitsTableColumnSettings]: UnitsTableColumnSettingsReducer
};
