import { GlobalsReducer } from './globals.reducer';
import { globals, unitsTableColumnSettings, unitsList, unitsTable, unitsTypes, controlPanel } from '../shared/appState';
import { UnitsTableColumnSettingsReducer } from '../modules/unitsTable/unitsTableColumnSettings.reducer';
import { UnitsListReducer } from './unitsList.reducer';
import { UnitsTableReducer } from '../modules/unitsTable/unitsTable.reducer';
import { UnitsTypesReducer } from './unitsTypes.reducer';
import { ControlPanelReducer } from '../modules/controlPanel/controlPanel.reducer';

export const Reducers = {
    [globals]: GlobalsReducer,
    [unitsList]: UnitsListReducer,
    [unitsTypes]: UnitsTypesReducer,
    [unitsTableColumnSettings]: UnitsTableColumnSettingsReducer,
    [controlPanel]: ControlPanelReducer,
    [unitsTable]: UnitsTableReducer
};
