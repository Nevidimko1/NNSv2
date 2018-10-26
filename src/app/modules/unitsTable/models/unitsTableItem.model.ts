import { Unit } from '../../../models/unitInfo/unit.model';
import { PriceState } from '../../shared/models/price.state';
import { SupplyState } from '../../shared/models/supply.state';
import { UnitCommonInfo } from 'src/app/models/unitInfo/unitCommonInfo.model';
import { UnitSummary } from 'src/app/models/unitSummary/unitSummary.model';
import { UnitForecast } from 'src/app/models/unitForecast/unitForecast.model';
import { IPriceStrategy } from 'src/app/models/strategy/priceStrategy.model';
import { INumericConfig } from 'src/app/models/strategy/numericConfig.model';
import { ISupplyStrategy } from 'src/app/models/strategy/supplyStrategy.model';
import { UnitsTableItemStatus } from './unitsTableItemStatus.model';

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

    private _status: UnitsTableItemStatus;

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

        this._status = new UnitsTableItemStatus();
    }

    set info(val: Unit) {
        this._info = val;
        this._productivityDisplay = Math.floor(this._info.productivity * 100) + '%';
    }
    get info(): Unit                            { return this._info; }

    set common(val: UnitCommonInfo) {
        this._common = val;
        this._top1Display = Math.floor(this._common.top1 * 100) + '%';
        this._top3Display = Math.floor(this._common.top3 * 100) + '%';
    }
    get common(): UnitCommonInfo                { return this._common; }

    set summary(val: UnitSummary)               { this._summary = val; }
    get summary(): UnitSummary                  { return this._summary; }

    set forecast(val: UnitForecast) {
        this._forecast = val;
        this._productivityTomorrowDisplay = Math.floor(this._forecast.productivity * 100) + '%';
    }
    get forecast(): UnitForecast                { return this._forecast; }

    get status(): UnitsTableItemStatus          { return this._status; }

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
    set priceState(val: PriceState)             { this._priceState = val; }
    get priceState(): PriceState                { return this._priceState; }
    get priceStrategy(): IPriceStrategy         { return this.priceState && this.priceState.strategy; }
    get priceMin(): INumericConfig              { return this.priceState && this.priceState.min; }
    get priceStrategyDisplay(): string          { return this.priceStrategy ? this.priceStrategy.shortName : ''; }
    get priceMinDisplay(): string               { return this.priceMin ? `${this.priceMin.shortName}` : ''; }
    get priceConfig(): string                   { return this.priceStrategyDisplay + this.priceMinDisplay; }

    /* Supply config */
    set supplyState(val: SupplyState)           { this._supplyState = val; }
    get supplyState(): SupplyState              { return this._supplyState; }
    get supplyStrategy(): ISupplyStrategy       { return this.supplyState && this.supplyState.strategy; }
    get supplyMin(): INumericConfig             { return this.supplyState && this.supplyState.min; }
    get supplyMaxValue(): INumericConfig        { return this.supplyState && this.supplyState.maxValue; }
    get supplyStrategyDisplay(): string         { return this.supplyStrategy ? this.supplyStrategy.shortName : ''; }
    get supplyMinDisplay(): string              { return this.supplyMin ? this.supplyMin.shortName : ''; }
    get supplyMaxValueDisplay(): string         { return this.supplyMaxValue ? this.supplyMaxValue.shortName : ''; }
    get supplyConfig(): string                  { return this.supplyStrategy + this.supplyMinDisplay + this.supplyMaxValueDisplay; }
}
