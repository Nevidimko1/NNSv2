export class Parser {
    protected error: string;

    constructor() { }

    public diff = (source: any, target: any, path = 'ROOT'): void => {
        if (source instanceof Array) {
            if (source.length && target.length) {
                this.diff(source[0], target[0], path + '[0]');
            }
        } else if (source instanceof Object && target != null) {
            const keysRemoved = Object.keys(target).filter(key => source[key] === undefined);
            if (keysRemoved.length) {
                throw new Error(`${this.error}\nKeys [${keysRemoved.join(', ')}] were removed`);
            } else {
                Object.keys(source).forEach(key => this.diff(source[key], target[key], path + '.' + key));
            }
        } else if (source !== null && target != null && typeof source !== typeof target) {
            throw new Error(`${this.error}\nCheck types for ${path}`);
        }
    }
}
