import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Parser } from '../parser';
import { NumberUtils } from 'src/app/utils/number.utils';
import { RetailProductHistory } from 'src/app/models/retail/retailProductHistory.model';

@Injectable()
export class RetailProductHistoryParser extends Parser {
    protected error = 'Failed to parse Product history page';

    constructor() {
        super();
    }

    public parse = (response: string): Observable<RetailProductHistory[]> => {
        return of($(response).find('table.list tr')
            .toArray()
            .slice(1)
            .map((row: HTMLTableRowElement) => ({
                quantity: NumberUtils.numberify($(row).find('td:eq(1)').text()),
                quality: NumberUtils.numberify($(row).find('td:eq(2)').text()),
                price: NumberUtils.numberify($(row).find('td:eq(3)').text()),
                brand: NumberUtils.numberify($(row).find('td:eq(4)').text())
            })));

    }
}
