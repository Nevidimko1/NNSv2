import { UnitsTableItem } from '../modules/unitsTable/models/unitsTableItem.model';

export class TopUtils {

    private static getK1 = (type: string): number => {
        switch (type) {
            case('shop'):
            case('restaurant'):
            case('lab'):
                return 5;
            case('workshop'):
                if (/anna/.test(window.location.href)) {
                    return 100;
                } else {
                    return 50;
                }
            case('mill'):
                return 5;
            case('sawmill'):
                return 12.5;
            case('animalfarm'):
                return 7.5;
            case('medicine'):
            case('fishingbase'):
                return 12.5;
            case('farm'):
                return 20;
            case('orchard'):
                return 15;
            case('mine'):
                if (/anna/.test(window.location.href)) {
                    return 50;
                } else {
                    return 100;
                }
            case('office'):
                return 1;
            case('service_light'):
                return 1.5;
            case('power'):
                return 75.0;
            case('repair'):
                return 2.5;
            case('fuel'):
                return 2.5;
            case('educational'):
                return 1.5;
            case('it'):
                return 1;
            case('villa'):
            case('warehouse'):
            case('unknown'):
            default:
                return 0;
        }
    }

    private static getK3 = (type): number => {
        switch (type) {
            case('shop'):
            case('restaurant'):
            case('lab'):
                return 5;
            case('workshop'):
                if (/anna/.test(window.location.href)) {
                    return 100;
                } else {
                    return 50;
                }
            case('mill'):
                if (/anna/.test(window.location.href)) {
                    return 100;
                }
                return 50;
            case('sawmill'):
                if (/anna/.test(window.location.href)) {
                    return 100;
                }
                return 50;
            case('animalfarm'):
                return 7.5;
            case('medicine'):
            case('fishingbase'):
                return 12.5;
            case('farm'):
                return 20;
            case('orchard'):
                return 15;
            case('mine'):
                if (/anna/.test(window.location.href)) {
                    return 50;
                } else {
                    return 100;
                }
            case('office'):
                return 1;
            case('service_light'):
                return 1.5;
            case('power'):
                return 75.0;
            case('repair'):
                return 2.5;
            case('fuel'):
                return 2.5;
            case('educational'):
                return 1.5;
            case('it'):
                return 1;
            case('villa'):
            case('warehouse'):
            case('unknown'):
            default:
                return 0;
        }
    }

    /**
        * q: player qualification.
        * qp: personal qualification.
        * k: unit type multiplier.
    */
    public static calculatePersonalTop1 = (q: number, qp: number, k: number): number => {
        return Math.floor(0.2 * k * 14 * q * q / Math.pow(1.4, qp));
    }

    /**
        * q: player qualification.
        * k: unit type multiplier.
    */
    public static calculatePersonalTop3 = (q: number, k: number): number => {
        return (2 * q * q + 6 * q) * k;
    }

    public static calculateTop1Load = (unit: UnitsTableItem): number => {
        if (unit.summary.onHoliday) {
            return 0;
        }

        const k = TopUtils.getK1(unit.info.unitClassKind);
        if (!k) {
            return 1;
        }

        const max = TopUtils.calculatePersonalTop1(unit.summary.competenceValue, unit.summary.employeeLevel, k);
        if (!max) {
            return 0;
        }

        return Math.floor(100 * unit.summary.employeeCount / max) / 100;
    }

    public static calculateTop3Load = (unit: UnitsTableItem): number => {
        const k = TopUtils.getK3(unit.info.unitClassKind);
        if (!k) {
            return 1;
        }

        const max = TopUtils.calculatePersonalTop3(unit.summary.competenceValue, k);
        if (!max) {
            return 0;
        }

        return Math.floor(100 * unit.summary.allStaff / max) / 100;
    }
}
