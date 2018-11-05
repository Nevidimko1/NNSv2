export const tokenUrl = (realm: string): string => `/api/${realm}/main/token`;
export const refreshCacheUrl = (realm: string): string => `/api/${realm}/main/unit/refresh`;
export const unitTypesListUrl = (realm: string): string => `/api/${realm}/main/unittype/browse`;
export const unitListUrl = (realm: string, id: number) => `/api/${realm}/main/company/units?id=${id}&pagesize=${new Date().getTime()}`;
export const citiesUrl = (realm: string) => `/api/${realm}/main/geo/city/browse`;

export const forecastUrl = (realm: string) => `/${realm}/ajax/unit/forecast`;
export const summaryUrl = (realm: string, id: number) => `/api/${realm}/main/unit/summary?id=${id}`;

export const tradingHallUrl = (realm: string, id: number) => `/${realm}/main/unit/view/${id}/trading_hall`;
export const productReportUrl = (realm: string, id: number, geo: string) =>
    `/api/${realm}/main/marketing/report/retail/metrics?format=json&product_id=${id}&geo=${geo}`;
export const productHistoryUrl = (realm: string, unitId: number, productId: number) =>
    `/${realm}/window/unit/view/${unitId}/product_history/${productId}/`;
