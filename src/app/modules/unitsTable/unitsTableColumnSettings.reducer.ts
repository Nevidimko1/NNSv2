import { UnitsTableColumnSettings } from './unitsTableColumnSettings.model';

export const UnitsTableColumnSettingsActions = {

};

const defaultState = new UnitsTableColumnSettings();

export function UnitsTableColumnSettingsReducer(state = defaultState, action: any) {
    switch (action.type) {
        default:
            return state;
    }
}
