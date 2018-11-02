import { RetailProductHistory } from './retailProductHistory.model';
import { RetailProductReport } from './retailProductReport.model';

export class RetailProduct {
    id: number;
    price: number;
    quality: number;
    purch: number;
    cityPrice: number;
    cityQuality: number;
    localPrice: number;
    localQuality: number;
    deliver: number;
    stock: number;
    share: number;
    geo: string;
    history: RetailProductHistory[];
    report: RetailProductReport;
    supply: number;
    updateFieldName: string;
}
