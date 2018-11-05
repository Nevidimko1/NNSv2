import { Unit } from '../models/unitInfo/unit.model';

export const UnitsListActions = {
    INIT: 'UnitsListActions.INIT',

    SET_PRODUCT_REPORT: 'UnitsListActions.SET_PRODUCT_REPORT'
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

        case UnitsListActions.SET_PRODUCT_REPORT: {
            const unit = state.values.filter(u => u.id === action.payload.unitId)[0];

            if (!unit) {
                return state;
            }

            const product = unit.products.filter(p => p.id === action.payload.productId)[0];

            if (!product) {
                return state;
            }

            product.report = action.payload.report;
            return {
                ...state
            };
        }

        default:
            return state;
    }
}
