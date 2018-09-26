import { IUnitItem } from './unitInfo.model';
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
    unitsList: IUnitItem[];
    unitTypes: IUnitType[];
}
