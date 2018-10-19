export class IUnitSummary {
    id: number;
    size: number;
    unitClassKind: string;
    unitTypeProduceName: string;
    technologyLevel: number;
    equipmentCount: number;
    equipmentMax: number;
    equipmentQuality: number;
    equipmentQualityRequired: number;
    equipmentWear: number;
    employeeCount: number;
    employeeMax: number;
    employeeRequiredByEquipment: number;
    employeeSalary: number;
    citySalary: number;
    salaryCost: number;
    employeeLevel: number;
    cityEducation: number;
    employeeLevelRequired: number;
    officeProductivity: number;
    equipmentProductivity: number;
    employeeProductivity: number;
    managerProductivity: number;
    knowledgeAreaId: number;
    knowledgeAreaName: string;
    knowledgeAreaKind: string;
    competenceValue: number;
    competenceValueWoBonus: number;
    allStaff: number;
    managerLevelRequired: number;
    productivity: number;
    loading: number;
    upgradeTimeToFinish: number;
    upgradeSize: number;
    upgradeUnitTypeEmployeeMax: number;
    supplyWarning: number;
    training: number;
    unitTypeName: string;
    unitTypeId: number;
    name: string;
    laborMax: number;
    laborQty: number;
    speedupCost: number;
    districtName: number;
    tradingSquare: number;
    rentCost: number;
    sectionCount: number;
    employeeRequired: number;
    cityEmployeeLevel: number;
    fame: number;
    advertisingCost: number;
    advertisingProductivity: number;
    customersCount: number;
    serviceType: number;
    boundLevel: number;
    unicity: number;
    districtId: number;
    square: number;
    companyId: number;
    userId: number;
    unitTypeProduceId: number;
    symbol: string;
    cityId: number;
    marketPrice: number;
    exclusiveMarketPrice: number;
    auctionLotId: number;
    isBankrupt: boolean;
    onBill: boolean;
    corpId: number;
    officeId: number;
    onHoliday: boolean;
    isStudent: boolean;
    unitId: number;
    text: string;
    officeName: string;
    notice: string;
    alreadyLearn: boolean;
}

export class UnitSummary {
    constructor(protected _data: IUnitSummary) { }

    get id(): number 			                { return this._data.id; }
    get size(): number 			                { return this._data.size; }
    get unitClassKind(): string 			    { return this._data.unitClassKind; }
    get unitTypeProduceName(): string 			{ return this._data.unitTypeProduceName; }
    get technologyLevel(): number 			    { return this._data.technologyLevel; }
    get equipmentCount(): number 			    { return this._data.equipmentCount; }
    get equipmentMax(): number 			        { return this._data.equipmentMax; }
    get equipmentQuality(): number 			    { return this._data.equipmentQuality; }
    get equipmentQualityRequired(): number 	    { return this._data.equipmentQualityRequired; }
    get equipmentWear(): number 			    { return this._data.equipmentWear; }
    get employeeCount(): number 			    { return this._data.employeeCount; }
    get employeeMax(): number 			        { return this._data.employeeMax; }
    get employeeRequiredByEquipment(): number 	{ return this._data.employeeRequiredByEquipment; }
    get employeeSalary(): number 			    { return this._data.employeeSalary; }
    get citySalary(): number 			        { return this._data.citySalary; }
    get salaryCost(): number 			        { return this._data.salaryCost; }
    get employeeLevel(): number 			    { return this._data.employeeLevel; }
    get cityEducation(): number 			    { return this._data.cityEducation; }
    get employeeLevelRequired(): number 		{ return this._data.employeeLevelRequired; }
    get officeProductivity(): number 			{ return this._data.officeProductivity; }
    get equipmentProductivity(): number 		{ return this._data.equipmentProductivity; }
    get employeeProductivity(): number 			{ return this._data.employeeProductivity; }
    get managerProductivity(): number 			{ return this._data.managerProductivity; }
    get knowledgeAreaId(): number 			    { return this._data.knowledgeAreaId; }
    get knowledgeAreaName(): string 			{ return this._data.knowledgeAreaName; }
    get knowledgeAreaKind(): string 			{ return this._data.knowledgeAreaKind; }
    get competenceValue(): number 			    { return this._data.competenceValue; }
    get competenceValueWoBonus(): number 		{ return this._data.competenceValueWoBonus; }
    get allStaff(): number 			            { return this._data.allStaff; }
    get managerLevelRequired(): number 			{ return this._data.managerLevelRequired; }
    get productivity(): number 			        { return this._data.productivity; }
    get loading(): number 			            { return this._data.loading; }
    get upgradeTimeToFinish(): number 			{ return this._data.upgradeTimeToFinish; }
    get upgradeSize(): number 			        { return this._data.upgradeSize; }
    get upgradeUnitTypeEmployeeMax(): number 	{ return this._data.upgradeUnitTypeEmployeeMax; }
    get supplyWarning(): number 			    { return this._data.supplyWarning; }
    get training(): number 			            { return this._data.training; }
    get unitTypeName(): string 			        { return this._data.unitTypeName; }
    get unitTypeId(): number 			        { return this._data.unitTypeId; }
    get name(): string 			                { return this._data.name; }
    get laborMax(): number 			            { return this._data.laborMax; }
    get laborQty(): number 			            { return this._data.laborQty; }
    get speedupCost(): number 		        	{ return this._data.speedupCost; }
    get districtName(): number 			        { return this._data.districtName; }
    get tradingSquare(): number     			{ return this._data.tradingSquare; }
    get rentCost(): number 		            	{ return this._data.rentCost; }
    get sectionCount(): number 		        	{ return this._data.sectionCount; }
    get employeeRequired(): number 	    		{ return this._data.employeeRequired; }
    get cityEmployeeLevel(): number 			{ return this._data.cityEmployeeLevel; }
    get fame(): number 			                { return this._data.fame; }
    get advertisingCost(): number 	    		{ return this._data.advertisingCost; }
    get advertisingProductivity(): number 		{ return this._data.advertisingProductivity; }
    get customersCount(): number 		    	{ return this._data.customersCount; }
    get serviceType(): number 		        	{ return this._data.serviceType; }
    get boundLevel(): number 		        	{ return this._data.boundLevel; }
    get unicity(): number 		            	{ return this._data.unicity; }
    get districtId(): number         			{ return this._data.districtId; }
    get square(): number 		            	{ return this._data.square; }
    get companyId(): number 			        { return this._data.companyId; }
    get userId(): number             			{ return this._data.userId; }
    get unitTypeProduceId(): number 			{ return this._data.unitTypeProduceId; }
    get symbol(): string             			{ return this._data.symbol; }
    get cityId(): number             			{ return this._data.cityId; }
    get marketPrice(): number        			{ return this._data.marketPrice; }
    get exclusiveMarketPrice(): number 			{ return this._data.exclusiveMarketPrice; }
    get auctionLotId(): number 		        	{ return this._data.auctionLotId; }
    get isBankrupt(): boolean       			{ return this._data.isBankrupt; }
    get onBill(): boolean 	            		{ return this._data.onBill; }
    get corpId(): number 		            	{ return this._data.corpId; }
    get officeId(): number 		            	{ return this._data.officeId; }
    get onHoliday(): boolean 			        { return this._data.onHoliday; }
    get isStudent(): boolean         			{ return this._data.isStudent; }
    get unitId(): number 		            	{ return this._data.unitId; }
    get text(): string 	                		{ return this._data.text; }
    get officeName(): string 		        	{ return this._data.officeName; }
    get notice(): string 	            		{ return this._data.notice; }
    get alreadyLearn(): boolean 		    	{ return this._data.alreadyLearn; }
}
