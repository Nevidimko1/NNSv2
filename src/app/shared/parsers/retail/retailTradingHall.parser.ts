import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Parser } from '../parser';
import { RetailProduct } from 'src/app/models/retail/retailProduct.model';
import { NumberUtils } from 'src/app/utils/number.utils';

@Injectable()
export class RetailTradingHallParser extends Parser {
    protected error = 'Failed to parse Trading hall page';

    constructor() {
        super();
    }

    public parse = (response: string): Observable<RetailProduct[]> => {
        const $html = $(response);

        const stocks = $html.find('.nowrap:nth-child(6)').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify($(e).text())) as number[],
            delivered = $html.find('.nowrap:nth-child(5)').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify($(e).text().split('[')[1])) as number[],
            qualities = $html.find('td:nth-child(7)').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify($(e).text())) as number[],
            purches = $html.find('td:nth-child(9)').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify($(e).text())) as number[],
            prices = $html.find(':text').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).val())) as number[],
            shares = $html.find('.nowrap:nth-child(11)').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify($(e).text())) as number[],
            cityPrices = $html.find('td:nth-child(12)').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify($(e).text())) as number[],
            cityQualities = $html.find('td:nth-child(13)').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify($(e).text())) as number[],
            updateFieldNames = $html.find(':text').toArray()
                .map((e: HTMLElement) => $(e).attr('name')) as string[],
            geos = $html.find('.grid a:has(img):not(:has(img[alt]))').toArray()
                .map((e: HTMLElement) => $(e).attr('href').match(/\d+\/\d+\/\d+/)[0]),
            produstIds = $html.find('a.popup').toArray()
                .map((e: HTMLElement) => NumberUtils.numberify($(e).attr('href').split('/')[9])) as number[];

        return of(produstIds.map((id: number, i) => ({
            id: id,
            price: prices[i],
            quality: qualities[i],
            purch: purches[i],
            cityPrice: cityPrices[i],
            cityQuality: cityQualities[i],
            localPrice: 0,
            localQuality: 0,
            deliver: delivered[i],
            stock: stocks[i],
            share: shares[i],
            geo: geos[i],
            history: [],
            report: null,
            supply: null,
            updateFieldName: updateFieldNames[i]
        })));

    }
}
