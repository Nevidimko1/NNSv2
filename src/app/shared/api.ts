export const tokenUrl = (realm: string): string => `/api/${realm}/main/token`;
export const unitTypesListUrl = (realm: string): string => `/api/${realm}/main/unittype/browse`;
export const unitListUrl = (realm: string, id: number) => `/api/${realm}/main/company/units?id=${id}&pagesize=${new Date().getTime()}`;
