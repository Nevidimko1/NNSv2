import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Parser } from '../parser';
import { IRetailProductReportResponse } from 'src/app/models/retail/retailProductReportResponse.model';
import { RetailProductReport } from 'src/app/models/retail/retailProductReport.model';
import { NumberUtils } from 'src/app/utils/number.utils';
import { retailProductReportData } from '../responses/retailProductReport.data';

@Injectable()
export class RetailProductReportParser extends Parser {
    protected error = 'Failed to parse Retail product report response';

    constructor() {
        super();
    }

    public parse = (response: IRetailProductReportResponse): Observable<RetailProductReport> => {
        this.diff(response, retailProductReportData);

        return of({
            avgBrand: NumberUtils.numberify(response.avg_brand),
            avgPrice: NumberUtils.numberify(response.avg_price),
            avgQuality: NumberUtils.numberify(response.avg_quality),
            companyCount: NumberUtils.numberify(response.company_count),
            indexMax: NumberUtils.numberify(response.index_max),
            indexMin: NumberUtils.numberify(response.index_min),
            localMarketLevel: NumberUtils.numberify(response.local_market_level),
            localMarketSize: NumberUtils.numberify(response.local_market_size),
            localPrice: NumberUtils.numberify(response.local_price),
            localQuality: NumberUtils.numberify(response.local_quality),
            name: response.name,
            shopCount: NumberUtils.numberify(response.shop_count),
            symbol: response.symbol,
        });
    }
}
