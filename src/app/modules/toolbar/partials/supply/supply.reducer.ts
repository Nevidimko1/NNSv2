export const SupplyActions = {
    UPDATE_ENABLED: 'SupplyActions.UPDATE_ENABLED',
    UPDATE_EXPAND: 'SupplyActions.UPDATE_EXPAND',
};

export class SupplyState {
    enabled: boolean;
    expand: boolean;
}

const defaultState: SupplyState = {
    enabled: false,
    expand: false
};

export function SupplyReducer(state = defaultState, action: any): SupplyState {
    switch (action.type) {
        case SupplyActions.UPDATE_ENABLED: {
            return {
                ...state,
                expand: action.payload,
                enabled: action.payload
            };
        }

        case SupplyActions.UPDATE_EXPAND: {
            return {
                ...state,
                expand: action.payload
            };
        }
        default:
            return state;
    }
}
