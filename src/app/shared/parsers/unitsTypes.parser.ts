import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CommonUtils } from '../../utils/common.utils';
import { Parser } from './parser';
import { UnitType } from '../../models/unitType/unitType.model';
import { IUnitTypesResponseItem, IUnitTypesResponse } from '../../models/unitType/unitTypeResponse.model';
import { unitTypeData } from './responses/unitType.data';

@Injectable()
export class UnitsTypesParser extends Parser {
    protected error = 'Failed to parse Units types response';

    constructor() {
        super();
    }

    public parse = (response: IUnitTypesResponse): Observable<UnitType[]> => {
        const data = CommonUtils.flatMap(response);
        this.diff(data[0], unitTypeData);

        return of(data.map((responseItem: IUnitTypesResponseItem) => new UnitType({
            id: Number(responseItem.id),
            industryId: Number(responseItem.industry_id),
            classId: Number(responseItem.class_id),
            kind: responseItem.kind,
            name: responseItem.name,
            industryName: responseItem.industry_name,
            className: responseItem.class_name,
            symbol: responseItem.symbol,
            needTechnology: responseItem.need_technology === 't',
            laborMax: Number(responseItem.labor_max),
            equipmentMax: Number(responseItem.equipment_max),
            square: Number(responseItem.square),
            buildingTime: Number(responseItem.building_time)
        })));
    }
}
