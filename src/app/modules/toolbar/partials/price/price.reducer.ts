export const PriceActions = {
    UPDATE_ENABLED: 'PriceActions.UPDATE_ENABLED',
    UPDATE_EXPAND: 'PriceActions.UPDATE_EXPAND',
};

export class PriceState {
    enabled: boolean;
    expand: boolean;
}

const defaultState: PriceState = {
    enabled: false,
    expand: false
};

export function PriceReducer(state = defaultState, action: any): PriceState {
    switch (action.type) {
        case PriceActions.UPDATE_ENABLED: {
            return {
                ...state,
                expand: action.payload,
                enabled: action.payload
            };
        }

        case PriceActions.UPDATE_EXPAND: {
            return {
                ...state,
                expand: action.payload
            };
        }
        default:
            return state;
    }
}
