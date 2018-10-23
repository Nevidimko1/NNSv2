import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { UnitsTableItem } from '../../unitsTable/models/unitsTableItem.model';
import { CommonUtils } from '../../../utils/common.utils';
import { IStrategy } from '../../../models/strategy/strategy.model';

@Component({
    selector: 'app-toolbar-section',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {
    private _selectedUnits: UnitsTableItem[] = [];
    private _expand = false;
    private _enabled = false;

    @Input()
    set selectedUnits(value: UnitsTableItem[]) {
        this._selectedUnits = value;
        this.selectedTypes = CommonUtils.uniqueValues(value.map(v => v.info), 'unitTypeSymbol');
        this._expand = this._enabled = !!this.availableStrategies;
    }
    get selectedUnits() {
        return this._selectedUnits;
    }

    set expand(value: boolean) {
        this._expand = value;
    }
    get expand() {
        return this._expand && (!!this.selectedTypes.length && !!this.availableStrategies.length);
    }

    set enabled(value: boolean) {
        this._enabled = value;
    }
    get enabled() {
        return this._enabled && (!!this.selectedTypes.length && !!this.availableStrategies.length);
    }

    protected strategies: IStrategy[] = [];
    protected selectedTypes: string[] = [];

    constructor() { }

    get availableStrategies() {
        if (this.selectedTypes.length) {
            return this.strategies.filter(s => {
                return this.selectedTypes.filter(t => (s.types as string[]).indexOf(t) > -1).length === this.selectedTypes.length;
            });
        } else {
            return [];
        }
    }

}
