import { IGlobalsState } from '../reducers/globals.reducer';
import { UnitsTableColumnSettings } from '../modules/unitsTable/unitsTableColumnSettings.model';
import { UnitsListState } from '../reducers/unitsList.reducer';
import { UnitsTableState } from '../modules/unitsTable/unitsTable.reducer';
import { UnitsTypesState } from '../reducers/unitsTypes.reducer';
import { ControlPanelState } from '../modules/controlPanel/controlPanel.reducer';
import { CitiesState } from '../reducers/cities.reducer';

export const globals = 'globals';
export const unitsList = 'unitsList';
export const unitsTypes = 'unitsTypes';
export const unitsTableColumnSettings = 'unitsTableColumnSettings';
export const cities = 'cities';

export const controlPanel = 'controlPanel';
export const unitsTable = 'unitsTable';

export interface AppState {
    globals: IGlobalsState;
    unitsList: UnitsListState;
    unitsTypes: UnitsTypesState;
    unitsTableColumnSettings: UnitsTableColumnSettings;
    cities: CitiesState;

    controlPanel: ControlPanelState;
    unitsTable: UnitsTableState;
}
