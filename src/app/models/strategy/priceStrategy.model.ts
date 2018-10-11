import { IStrategy } from './strategy.model';
import { UnitProduct } from '../unitInfo/unitProduct.model';

export interface IPriceStrategy extends IStrategy {
    calc(p: UnitProduct): number;
}
