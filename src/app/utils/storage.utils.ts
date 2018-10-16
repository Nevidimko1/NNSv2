import * as LZ from 'lz-string';

export interface IStorageItem {
    date: Date;
    data: any;
}

const PREFIX = 'NNS/';

export class StorageItem {
    constructor(private body: IStorageItem = { date: new Date(), data: {} }) { }

    public get today(): boolean {
        if (!this.body.date) {
            return false;
        }

        const now = new Date();
        return this.body.date.getFullYear() === now.getFullYear() &&
            this.body.date.getMonth() === now.getMonth() &&
            this.body.date.getDate() === now.getDate();
    }

    public get data(): any {
        return this.body.data;
    }
}

export class LS {
    public static set = (key: string, data: any): void => {
        const itemData: IStorageItem = { date: new Date(), data };
        localStorage.setItem(PREFIX + key, LZ.compress(JSON.stringify(itemData)));
    }

    public static get = (key: string): null | StorageItem => {
        const raw = LZ.decompress(localStorage.getItem(PREFIX + key));
        if (!raw) {
            return null;
        }

        const parsed = JSON.parse(raw) as IStorageItem;
        parsed.date = parsed.date ? new Date(parsed.date as any as string) : null;
        return new StorageItem(parsed);
    }

}
