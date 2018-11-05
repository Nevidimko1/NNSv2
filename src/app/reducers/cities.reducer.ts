import { City } from '../models/geo/city.model';

export const CitiesActions = {
    INIT: 'CitiesActions.INIT'
};

export class CitiesState {
    values: City[];
}

const defaultState: CitiesState = {
    values: []
};

export function CitiesReducer(state = defaultState, action: any): CitiesState {
    switch (action.type) {
        case CitiesActions.INIT: {
            return {
                ...state,
                values: action.payload
            };
        }

        default:
            return state;
    }
}
