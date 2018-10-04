import { Unit } from '../models/unitInfo/unit.model';
import { UnitType } from '../models/unitType/unitType.model';

export const UnitsTypesActions = {
    INIT: 'UnitsTypesActions.INIT'
};

export class UnitsTypesState {
    values: UnitType[];
}

const defaultState: UnitsTypesState = {
    values: []
};

export function UnitsTypesReducer(state = defaultState, action: any): UnitsTypesState {
    switch (action.type) {
        case UnitsTypesActions.INIT: {
            return {
                ...state,
                values: action.payload
            };
        }

        default:
            return state;
    }
}
