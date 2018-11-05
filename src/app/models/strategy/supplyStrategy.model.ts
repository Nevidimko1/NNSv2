import { IStrategy } from './strategy.model';
import { RetailSupplyProduct } from '../retail/retailSupplyProduct.model';

export interface ISupplyStrategy extends IStrategy {
    calc(p: RetailSupplyProduct): number;
}
