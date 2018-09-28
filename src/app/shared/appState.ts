import { IGlobals } from '../models/globals.model';
import { UnitsTableColumnSettings } from '../modules/unitsTable/unitsTableColumnSettings.model';

export const globals = 'globals';
export const unitsTableColumnSettings = 'unitsTableColumnSettings';

export interface AppState {
    globals: IGlobals;
    unitsTableColumnSettings: UnitsTableColumnSettings;
}
