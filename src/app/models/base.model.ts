export interface IBase {
    id: number;
    name: string;
}

export class Base {

    constructor(protected _data: IBase) {

    }

    get id(): number {
        return this._data.id;
    }

    get name(): string {
        return this._data.name;
    }
}
