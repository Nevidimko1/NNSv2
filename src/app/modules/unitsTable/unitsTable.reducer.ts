import { UnitsTableItem } from './models/unitsTableItem.model';

export const UnitsTableActions = {
    INIT: 'UnitsTableActions.INIT',

    UPDATE_SELECTION: 'UnitsTableActions.UPDATE_SELECTION',

    SET_PRICE_STRATEGY: 'UnitsTableActions.SET_PRICE_STRATEGY',
    SET_PRICE_MIN: 'UnitsTableActions.SET_PRICE_MIN',

    SET_SUPPLY_STRATEGY: 'UnitsTableActions.SET_SUPPLY_STRATEGY',
    SET_SUPPLY_MIN: 'UnitsTableActions.SET_SUPPLY_MIN',
    SET_SUPPLY_MAX_VALUE: 'UnitsTableActions.SET_SUPPLY_MAX_VALUE',

    SET_FORECAST: 'UnitsTableActions.SET_FORECAST',
    SET_SUMMARY: 'UnitsTableActions.SET_SUMMARY',
    SET_COMMON: 'UnitsTableActions.SET_COMMON',

    UPDATE_PROGRESS: 'UnitsTableActions.UPDATE_PROGRESS'
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
                values: action.payload
            };
        }

        case UnitsTableActions.UPDATE_SELECTION: {
            return {
                ...state,
                selected: action.payload
            };
        }

        case UnitsTableActions.SET_PRICE_STRATEGY: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.priceState.strategy = action.payload.value;
                return {
                    ...state
                };
            }

            return state;
        }
        case UnitsTableActions.SET_PRICE_MIN: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.priceState.min = action.payload.value;
                return {
                    ...state
                };
            }

            return state;
        }

        case UnitsTableActions.SET_SUPPLY_STRATEGY: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.supplyState.strategy = action.payload.value;
                return {
                    ...state
                };
            }

            return state;
        }
        case UnitsTableActions.SET_SUPPLY_MIN: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.supplyState.min = action.payload.value;
                return {
                    ...state
                };
            }

            return state;
        }
        case UnitsTableActions.SET_SUPPLY_MAX_VALUE: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.supplyState.maxValue = action.payload.value;
                return {
                    ...state
                };
            }

            return state;
        }

        case UnitsTableActions.SET_FORECAST: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.forecast = action.payload.forecast;
                return {
                    ...state
                };
            }

            return state;
        }

        case UnitsTableActions.SET_SUMMARY: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.summary = action.payload.summary;
                return {
                    ...state
                };
            }

            return state;
        }

        case UnitsTableActions.SET_COMMON: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.common = action.payload.common;
                return {
                    ...state
                };
            }

            return state;
        }

        case UnitsTableActions.UPDATE_PROGRESS: {
            const ex: UnitsTableItem = state.values.filter(i => i.id === action.payload.id)[0];

            if (ex) {
                ex.status.inProgress = action.payload.inProgress;
                return {
                    ...state
                };
            }

            return state;
        }

        default:
            return state;
    }
}
