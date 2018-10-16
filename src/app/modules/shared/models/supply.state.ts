import { ISupplyStrategy } from '../../../models/strategy/supplyStrategy.model';
import { INumericConfig } from 'src/app/models/strategy/numericConfig.model';

export class SupplyState {
    strategy: ISupplyStrategy;
    min: INumericConfig;
    maxValue: INumericConfig;
}
