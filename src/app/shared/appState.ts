import { IGlobalsState } from '../reducers/globals.reducer';
import { UnitsTableColumnSettings } from '../modules/unitsTable/unitsTableColumnSettings.model';
import { UnitsListState } from '../reducers/unitsList.reducer';

export const globals = 'globals';
export const unitsList = 'unitsList';
export const unitsTableColumnSettings = 'unitsTableColumnSettings';

export interface AppState {
    globals: IGlobalsState;
    unitsList: UnitsListState;
    unitsTableColumnSettings: UnitsTableColumnSettings;
}
