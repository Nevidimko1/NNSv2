import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Parser } from '../parser';
import { NumberUtils } from 'src/app/utils/number.utils';
import { RetailSupplyProduct } from 'src/app/models/retail/retailSupplyProduct.model';

@Injectable()
export class RetailSupplyParser extends Parser {
    protected error = 'Failed to parse Retaul Supply page';

    constructor() {
        super();
    }

    public parse = (response: string): Observable<RetailSupplyProduct[]> => {
        const $html = $(response),
        parcels = $html.find('input:text[name^="supplyContractData[party_quantity]"]').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).val())) as number[],
        priceMarkUps = $html.find('select[name^="supplyContractData[price_mark_up]"]').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).val())) as number[],
        priceConstraintMaxes = $html.find('input[name^="supplyContractData[price_constraint_max]"]').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).val())) as number[],
        priceConstraintTypes = $html.find('select[name^="supplyContractData[constraintPriceType]"]').toArray()
            .map((e: HTMLElement) => $(e).val()) as string[],
        qualityConstraintMins = $html.find('input[name^="supplyContractData[quality_constraint_min]"]').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).val())) as number[],
        purchases = $html.find('td.nowrap:nth-child(4)').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify($(e).text())) as number[],
        stock = $html.find('td:nth-child(2) table:nth-child(1) tr:nth-child(1) td:nth-child(2)').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).text())) as number[],
        solds = $html.find('td:nth-child(2) table:nth-child(1) tr:nth-child(5) td:nth-child(2)').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).text())) as number[],
        offers = $html.find('.destroy').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).val())) as number[],
        prices = $html.find('td:nth-child(9) table:nth-child(1) tr:nth-child(1) td:nth-child(2)').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).text())) as number[],
        reprices = $html.find('td:nth-child(9) table:nth-child(1) tr:nth-child(1) td:nth-child(2)').toArray()
            .map((e: HTMLElement) => !!$(e).find('div').length) as boolean[],
        qualities = $html.find('td:nth-child(9) table:nth-child(1) tr:nth-child(2) td:nth-child(2)').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).text())) as number[],
        availables = $html.find('td:nth-child(10) table:nth-child(1) tr:nth-child(3) td:nth-child(2)').toArray()
            .map((e: HTMLElement) => NumberUtils.numberify(($(e) as any).text())) as number[],
        imgs = $html.find('.noborder td > img').toArray()
            .map((e: HTMLElement) => $(e).attr('src')) as string[],
        supplySymbols = imgs.map((url: string) => url.replace('/img/products/', '').split('.')[0]);

        return of(supplySymbols.map((symbol: string, i: number) => ({
            symbol,
            parcel: parcels[i],
            priceMarkUp: priceMarkUps[i],
            priceConstraintMax: priceConstraintMaxes[i],
            priceConstraintType: priceConstraintTypes[i],
            qualityConstraintMin: qualityConstraintMins[i],
            purchase: purchases[i],
            stock: stock[i],
            sold: solds[i],
            offer: offers[i],
            price: prices[i],
            reprice: reprices[i],
            quality: qualities[i],
            available: availables[i]
        })));
    }
}
