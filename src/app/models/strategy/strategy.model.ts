import { UNIT_TYPES } from '../../shared/unitTypes.enum';

export interface IStrategy {
    id: string;
    types: UNIT_TYPES[];
    name: string;
    shortName: string;
}
