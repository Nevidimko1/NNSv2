import { Unit } from '../../../models/unitInfo/unit.model';
import { PriceState } from '../../shared/models/price.state';
import { SupplyState } from '../../shared/models/supply.state';
import { UnitCommonInfo } from 'src/app/models/unitInfo/unitCommonInfo.model';
import { UnitSummary } from 'src/app/models/unitSummary/unitSummary.model';
import { UnitForecast } from 'src/app/models/unitForecast/unitForecast.model';

export class UnitsTableItem {
    private _info: Unit;
    private _common: UnitCommonInfo;
    private _summary: UnitSummary;
    private _forecast: UnitForecast;

    private _priceState: PriceState;
    private _supplyState: SupplyState;

    private _productivityDisplay: string;
    private _productivityTomorrowDisplay: string;
    private _top1Display: string;
    private _top3Display: string;

    constructor(info: Unit) {
        this._productivityDisplay = '?';
        this._productivityTomorrowDisplay = '?';
        this._top1Display = '?';
        this._top3Display = '?';

        this.info = info;

        this._common = null;
        this._summary = null;
        this._forecast = null;

        this._priceState = new PriceState();
        this._supplyState = new SupplyState();
    }

    get info(): Unit                            { return this._info; }
    get common(): UnitCommonInfo                { return this._common; }
    get summary(): UnitSummary                  { return this._summary; }
    get forecast(): UnitForecast                { return this._forecast; }

    set info(val: Unit) {
        this._info = val;
        this._productivityDisplay = Math.floor(this._info.productivity * 100) + '%';
    }
    set common(val: UnitCommonInfo) {
        this._common = val;
        this._top1Display = Math.floor(this._common.top1 * 100) + '%';
        this._top3Display = Math.floor(this._common.top3 * 100) + '%';
    }
    set summary(val: UnitSummary)               { this._summary = val; }
    set forecast(val: UnitForecast)             {
        this._forecast = val;
        this._productivityTomorrowDisplay = Math.floor(this._forecast.productivity * 100) + '%';
    }

    get id(): number                            { return this._info.id; }

    get productivity(): number                  { return this.info && this.info.productivity; }
    get productivityDisplay(): string           { return this._productivityDisplay; }

    get productivityTomorrow(): number          { return this.forecast && this.forecast.productivity; }
    get productivityTomorrowDisplay(): string   { return this._productivityTomorrowDisplay; }

    get top1(): number                          { return this.common && this.common.top1; }
    get top1Display(): string                   { return this._top1Display; }

    get top3(): number                          { return this.common && this.common.top3; }
    get top3Display(): string                   { return this._top3Display; }

    /* Price config */
    get priceState(): PriceState                { return this._priceState; }
    get priceStrategy(): string                 { return this._priceState.strategy ? this._priceState.strategy.shortName : ''; }
    get priceMinDisplay(): string               { return this._priceState.min ? `${this.priceState.min.shortName}` : ''; }
    get priceConfig(): string                   { return (this.priceStrategy + this.priceMinDisplay) || ''; }

    /* Supply config */
    get supplyState(): SupplyState              { return this._supplyState; }
    get supplyStrategy(): string                { return this._supplyState.strategy ? this._supplyState.strategy.shortName : ''; }
    get supplyMin(): number                     { return this._supplyState.min ? this._supplyState.min.value : null; }
    get supplyMinDisplay(): string              { return this._supplyState.min ? `${this._supplyState.min.shortName}` : ''; }
    get supplyMaxValue(): number                { return this._supplyState.maxValue ? this._supplyState.maxValue.value : null; }
    get supplyMaxValueDisplay(): string         { return this._supplyState.maxValue ? `${this._supplyState.maxValue.shortName}` : ''; }
    get supplyConfig(): string                  { return (this.supplyStrategy + this.supplyMinDisplay + this.supplyMaxValueDisplay) || ''; }
}
