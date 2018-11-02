import { IStrategy } from './strategy.model';
import { RetailProduct } from '../retail/retailProduct.model';

export interface IPriceStrategy extends IStrategy {
    calc(p: RetailProduct): number;
}
