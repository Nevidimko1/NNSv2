import { UnitsTableItem } from './models/unitsTableItem.model';
import { Unit } from '../../models/unitInfo/unit.model';

export const UnitsTableActions = {
    INIT: 'UnitsTableActions.INIT',

    UPDATE_SELECTION: 'UnitsTableActions.UPDATE_SELECTION'
};

export class UnitsTableState {
    values: UnitsTableItem[];
    selected: UnitsTableItem[];
}

const defaultState: UnitsTableState = {
    values: [],
    selected: []
};

export function UnitsTableReducer(state = defaultState, action: any): UnitsTableState {
    switch (action.type) {
        case UnitsTableActions.INIT: {
            return {
                ...state,
                values: action.payload.map((unit: Unit) => new UnitsTableItem(unit))
            };
        }

        case UnitsTableActions.UPDATE_SELECTION: {
            return {
                ...state,
                selected: action.payload
            };
        }

        default:
            return state;
    }
}
