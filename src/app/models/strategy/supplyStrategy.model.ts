import { IStrategy } from './strategy.model';
import { UnitProduct } from '../unitInfo/unitProduct.model';

export interface ISupplyStrategy extends IStrategy {
    calc(p: UnitProduct): number;
}
