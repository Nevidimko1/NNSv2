import { IBase, Base } from '../base.model';
import { UnitIndicator } from './unitIndicator.model';
import { UnitProduct } from './unitProduct.model';

export interface IUnit extends IBase {
    countrySymbol: string;
    countryName: string;
    regionName: string;
    cityName: string;
    unitTypeId: number;
    unitTypeSymbol: string;
    unitTypeName: string;
    size: number;
    laborMax: number;
    equipmentMax: number;
    square: number;
    unitTypeProduceName: string;
    unitClassId: number;
    unitClassName: string;
    unitClassKind: string;
    productivity: number;
    notice: string;
    marketStatus: string;
    timeToBuild: number;
    officeSort: number;
    url: string;

    products: UnitProduct[];
    indicators: UnitIndicator[];
}

export class Unit extends Base {

    constructor(protected _data: IUnit) {
        super(_data);
    }

    get countrySymbol(): string {       return this._data.countrySymbol; }
    get countryName(): string {         return this._data.countryName; }
    get regionName(): string {          return this._data.regionName; }
    get cityName(): string {            return this._data.cityName; }
    get unitTypeId(): number {          return this._data.unitTypeId; }
    get unitTypeSymbol(): string {      return this._data.unitTypeSymbol; }
    get unitTypeName(): string {        return this._data.unitTypeName; }
    get size(): number {                return this._data.size; }
    get laborMax(): number {            return this._data.laborMax; }
    get equipmentMax(): number {        return this._data.equipmentMax; }
    get square(): number {              return this._data.square; }
    get unitTypeProduceName(): string { return this._data.unitTypeProduceName; }
    get unitClassId(): number {         return this._data.unitClassId; }
    get unitClassName(): string {       return this._data.unitClassName; }
    get unitClassKind(): string {       return this._data.unitClassKind; }
    get productivity(): number {        return this._data.productivity; }
    get notice(): string {              return this._data.notice; }
    get marketStatus(): string {        return this._data.marketStatus; }
    get timeToBuild(): number {         return this._data.timeToBuild; }
    get officeSort(): number {          return this._data.officeSort; }
    get url(): string {                 return this._data.url; }

    get products(): UnitProduct[] {     return this._data.products; }
    get indicators(): UnitIndicator[] { return this._data.indicators; }
}
