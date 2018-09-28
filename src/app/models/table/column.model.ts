export interface IColumnData {
    field: string;
    fieldToSort: string;
    name: string;
    title?: string;
    width: string;
    headerClass?: string;
    class?: string;
}

export class Column {
    constructor(private data: IColumnData) {

    }

    get field(): string {
        return this.data.field;
    }

    get fieldToSort(): string {
        return this.data.fieldToSort;
    }

    get name(): string {
        return this.data.name;
    }

    get title(): string {
        return this.data.title || '';
    }

    get width(): string {
        return this.data.width;
    }

    get headerClass(): string {
        return this.data.headerClass || '';
    }

    get class(): string {
        return this.data.class || '';
    }
}
