export const GlobalsActions = {
    SET_INFO: 'GlobalsActions.SET_INFO',
    SET_TOKEN: 'GlobalsActions.SET_TOKEN'
};

export interface IGlobalsInfo {
    realm: string;
    date: string;
    companyId: number;
    isUnitListPage: boolean;
    isNNSPage: boolean;
}

export interface IGlobalsState {
    token: string;
    info: IGlobalsInfo;
}

const defaultState: IGlobalsState = {
    token: null,
    info: null
};

export function GlobalsReducer(state = defaultState, action: any): IGlobalsState {
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

        default:
            return state;
    }
}
