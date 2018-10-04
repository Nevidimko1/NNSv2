import { Unit } from './unitInfo/unit.model';
import { IUnitType } from './unitType.model';

export interface IGlobalsInfo {
    realm: string;
    date: string;
    companyId: number;
    isUnitListPage: boolean;
    isNNSPage: boolean;
}

export interface IGlobals {
    token: string;
    info: IGlobalsInfo;
    unitsList: Unit[];
    unitTypes: IUnitType[];
}
