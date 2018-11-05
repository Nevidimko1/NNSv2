import { RetailProductReport } from './retailProductReport.model';

export class RetailSupplyProduct {
    symbol;
    parcel: number;
    priceMarkUp: number;
    priceConstraintMax: number;
    priceConstraintType: string;
    qualityConstraintMin: number;
    purchase: number;
    stock: number;
    sold: number;
    offer: number;
    price: number;
    reprice: boolean;
    quality: number;
    available: number;

    id?: number;
    report?: RetailProductReport;
}
