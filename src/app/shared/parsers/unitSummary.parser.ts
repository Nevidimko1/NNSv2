import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Parser } from './parser';
import { IUnitSummaryResponse } from 'src/app/models/unitSummary/unitSummaryResponse.model';
import { UnitSummary } from 'src/app/models/unitSummary/unitSummary.model';
import { NumberUtils } from 'src/app/utils/number.utils';
import { unitSummaryData } from './responses/unitSummary.data';

@Injectable()
export class UnitSummaryParser extends Parser {
    protected error = 'Failed to parse Units summary response';

    constructor( ) {
        super();
    }

    public parse = (response: IUnitSummaryResponse): Observable<UnitSummary> => {
        this.diff(response, unitSummaryData);

        return of(new UnitSummary({
            id: NumberUtils.numberify(response.id),
            size: NumberUtils.numberify(response.size),
            unitClassKind: response.unit_class_kind,
            unitTypeProduceName: response.unit_type_produce_name,
            technologyLevel: NumberUtils.numberify(response.technology_level),
            equipmentCount: NumberUtils.numberify(response.equipment_count),
            equipmentMax: NumberUtils.numberify(response.equipment_max),
            equipmentQuality: NumberUtils.numberify(response.equipment_quality),
            equipmentQualityRequired: NumberUtils.numberify(response.equipment_quality_required),
            equipmentWear: NumberUtils.numberify(response.equipment_wear),
            employeeCount: NumberUtils.numberify(response.employee_count),
            employeeMax: NumberUtils.numberify(response.employee_max),
            employeeRequiredByEquipment: NumberUtils.numberify(response.employee_required_by_equipment),
            employeeSalary: NumberUtils.numberify(response.employee_salary),
            citySalary: NumberUtils.numberify(response.city_salary),
            salaryCost: NumberUtils.numberify(response.salary_cost),
            employeeLevel: NumberUtils.numberify(response.employee_level),
            cityEducation: NumberUtils.numberify(response.city_education),
            employeeLevelRequired: NumberUtils.numberify(response.employee_level_required),
            officeProductivity: NumberUtils.numberify(response.office_productivity),
            equipmentProductivity: NumberUtils.numberify(response.equipment_productivity),
            employeeProductivity: NumberUtils.numberify(response.employee_productivity),
            managerProductivity: NumberUtils.numberify(response.manager_productivity),
            knowledgeAreaId: NumberUtils.numberify(response.knowledge_area_id),
            knowledgeAreaName: response.knowledge_area_name,
            knowledgeAreaKind: response.knowledge_area_kind,
            competenceValue: NumberUtils.numberify(response.competence_value),
            competenceValueWoBonus: NumberUtils.numberify(response.competence_value_wo_bonus),
            allStaff: NumberUtils.numberify(response.all_staff),
            managerLevelRequired: NumberUtils.numberify(response.manager_level_required),
            productivity: NumberUtils.numberify(response.productivity),
            loading: NumberUtils.numberify(response.loading),
            upgradeTimeToFinish: NumberUtils.numberify(response.upgrade_time_to_finish),
            upgradeSize: NumberUtils.numberify(response.upgrade_size),
            upgradeUnitTypeEmployeeMax: NumberUtils.numberify(response.upgrade_unit_type_employee_max),
            supplyWarning: NumberUtils.numberify(response.supply_warning),
            training: NumberUtils.numberify(response.training),
            unitTypeName: response.unit_type_name,
            unitTypeId: NumberUtils.numberify(response.unit_type_id),
            name: response.name,
            laborMax: NumberUtils.numberify(response.labor_max),
            laborQty: NumberUtils.numberify(response.labor_qty),
            speedupCost: response.speedup_cost,
            districtName: NumberUtils.numberify(response.district_name),
            tradingSquare: NumberUtils.numberify(response.trading_square),
            rentCost: NumberUtils.numberify(response.rent_cost),
            sectionCount: NumberUtils.numberify(response.section_count),
            employeeRequired: NumberUtils.numberify(response.employee_required),
            cityEmployeeLevel: NumberUtils.numberify(response.city_employee_level),
            fame: NumberUtils.numberify(response.fame),
            advertisingCost: NumberUtils.numberify(response.advertising_cost),
            advertisingProductivity: NumberUtils.numberify(response.advertising_productivity),
            customersCount: NumberUtils.numberify(response.customers_count),
            serviceType: NumberUtils.numberify(response.service_type),
            boundLevel: NumberUtils.numberify(response.bound_level),
            unicity: NumberUtils.numberify(response.unicity),
            districtId: NumberUtils.numberify(response.district_id),
            square: NumberUtils.numberify(response.square),
            companyId: NumberUtils.numberify(response.company_id),
            userId: NumberUtils.numberify(response.user_id),
            unitTypeProduceId: NumberUtils.numberify(response.unit_type_produce_id),
            symbol: response.symbol,
            cityId: NumberUtils.numberify(response.city_id),
            marketPrice: NumberUtils.numberify(response.market_price),
            exclusiveMarketPrice: NumberUtils.numberify(response.exclusive_market_price),
            auctionLotId: NumberUtils.numberify(response.auction_lot_id),
            isBankrupt: response.is_bankrupt === 't',
            onBill: response.on_bill === 't',
            corpId: NumberUtils.numberify(response.corp_id),
            officeId: NumberUtils.numberify(response.office_id),
            onHoliday: response.on_holiday === 't',
            isStudent: response.is_student === 't',
            unitId: NumberUtils.numberify(response.unit_id),
            text: response.text,
            officeName: response.office_name,
            notice: response.notice,
            alreadyLearn: response.already_learn === 't',
        }));
    }
}
