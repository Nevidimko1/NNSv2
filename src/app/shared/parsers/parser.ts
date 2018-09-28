export class Parser {
    protected error: string;

    constructor() { }

    public diff = (source: object, type: object): void => {
        const sourceKeys = Object.keys(source),
            missingKeys = Object.keys(type).filter(k => sourceKeys.indexOf(k) === -1);
        if (missingKeys.length) {
            throw new Error(this.error);
        }
    }
}
