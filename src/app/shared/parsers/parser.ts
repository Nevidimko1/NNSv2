export class Parser {
    protected error: string;

    constructor() { }

    public diff = (source: object, target: any): void => {
        const type = new target();
        const sourceKeys = Object.keys(source),
            missingKeys = Object.getOwnPropertyNames(type).filter(k => sourceKeys.indexOf(k) === -1);
        if (missingKeys.length) {
            throw new Error(this.error);
        }
    }
}
