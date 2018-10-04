import { IGlobals } from '../models/globals.model';

export const GlobalsActions = {
    SET_INFO: 'GlobalsActions.SET_INFO',
    SET_TOKEN: 'GlobalsActions.SET_TOKEN',
    SET_UNIT_LIST: 'GlobalsActions.SET_UNIT_LIST',
    SET_UNIT_TYPES: 'GlobalsActions.SET_UNIT_TYPES',

};

const defaultState: IGlobals = {
    token: null,
    info: null,
    unitsList: [],
    unitTypes: []
};

export function GlobalsReducer(state = defaultState, action: any): IGlobals {
    switch (action.type) {
        case GlobalsActions.SET_INFO: {
            return {
                ...state,
                info: action.payload
            };
        }

        case GlobalsActions.SET_TOKEN: {
            return {
                ...state,
                token: action.payload
            };
        }

        case GlobalsActions.SET_UNIT_LIST: {
            return {
                ...state,
                unitsList: action.payload
            };
        }

        case GlobalsActions.SET_UNIT_TYPES: {
            return {
                ...state,
                unitTypes: action.payload
            };
        }

        default:
            return state;
    }
}
