import { Unit } from '../models/unitInfo/unit.model';

export const UnitsListActions = {
    INIT: 'UnitsListActions.INIT'
};

export class UnitsListState {
    values: Unit[];
}

const defaultState: UnitsListState = {
    values: []
};

export function UnitsListReducer(state = defaultState, action: any): UnitsListState {
    switch (action.type) {
        case UnitsListActions.INIT: {
            return {
                ...state,
                values: action.payload
            };
        }

        default:
            return state;
    }
}
