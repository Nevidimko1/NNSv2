import { ISupplyStrategy } from '../../../models/strategy/supplyStrategy.model';

export class SupplyState {
    strategy: ISupplyStrategy;
    min: number;
    maxValue: number;
}
