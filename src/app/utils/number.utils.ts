export class NumberUtils {
    public static numberify(variable: string): number {
        // возвращает либо число полученно из строки, либо БЕСКОНЕЧНОСТЬ, либо 0 если не получилось преобразовать.
        if (String(variable) === 'Не огр.' ||
            String(variable) === 'Unlim.' ||
            String(variable) === 'Не обм.' ||
            String(variable) === 'N’est pas limité' ||
            String(variable) === 'No limitado' ||
            String(variable) === '无限' ||
            String(variable) === 'Nicht beschr.') {
            return Number.POSITIVE_INFINITY;
        } else {
            return parseFloat(String(variable).replace(/[\s\$\%\©]/g, '')) || 0;
        }
    }
}
