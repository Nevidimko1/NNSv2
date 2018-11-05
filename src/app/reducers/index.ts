import { GlobalsReducer } from './globals.reducer';
import { globals, unitsTableColumnSettings, unitsList, unitsTable, unitsTypes, controlPanel, cities } from '../shared/appState';
import { UnitsTableColumnSettingsReducer } from '../modules/unitsTable/unitsTableColumnSettings.reducer';
import { UnitsListReducer } from './unitsList.reducer';
import { UnitsTableReducer } from '../modules/unitsTable/unitsTable.reducer';
import { UnitsTypesReducer } from './unitsTypes.reducer';
import { ControlPanelReducer } from '../modules/controlPanel/controlPanel.reducer';
import { CitiesReducer } from './cities.reducer';

export const Reducers = {
    [globals]: GlobalsReducer,
    [unitsList]: UnitsListReducer,
    [unitsTypes]: UnitsTypesReducer,
    [unitsTableColumnSettings]: UnitsTableColumnSettingsReducer,
    [cities]: CitiesReducer,
    [controlPanel]: ControlPanelReducer,
    [unitsTable]: UnitsTableReducer
};
