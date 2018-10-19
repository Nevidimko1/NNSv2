export const tokenUrl = (realm: string): string => `/api/${realm}/main/token`;
export const refreshCacheUrl = (realm: string): string => `/api/${realm}/main/unit/refresh`;
export const unitTypesListUrl = (realm: string): string => `/api/${realm}/main/unittype/browse`;
export const unitListUrl = (realm: string, id: number) => `/api/${realm}/main/company/units?id=${id}&pagesize=${new Date().getTime()}`;

export const forecastUrl = (realm: string) => `/${realm}/ajax/unit/forecast`;
