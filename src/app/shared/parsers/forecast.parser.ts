import { Injectable } from '@angular/core';
import { Parser } from './parser';
import { IUnitForecastResponse } from 'src/app/models/unitForecast/unitForecastResponse.model';
import { UnitForecast } from 'src/app/models/unitForecast/unitForecast.model';

@Injectable()
export class ForecastParser extends Parser {
    protected error = 'Failed to parse Forecast response';

    constructor() {
        super();
    }

    private parseValue = (value: string): number => {
        if (value == null) {
            return 0;
        } else if (value === '') {
            return 1;
        } else {
            return Number(value);
        }
    }

    /*
        response could be 'false' in some cases (e.g. employees are on vacation)
        so don't check poperty match
    */
    public parse = (response: IUnitForecastResponse): UnitForecast => {
        return new UnitForecast({
            employeeProductivity: this.parseValue(response.employee_productivity),
            equipmentProductivity: this.parseValue(response.equipment_productivity),
            loading: this.parseValue(response.loading),
            managerProductivity: this.parseValue(response.manager_productivity),
            officeProductivity: this.parseValue(response.office_productivity),
            power: this.parseValue(response.power),
            productivity: this.parseValue(response.productivity),
            turnId: this.parseValue(response.turn_id),
            unitComplexity: this.parseValue(response.unit_complexity),
            unitId: this.parseValue(response.unit_id)
        });
    }
}
