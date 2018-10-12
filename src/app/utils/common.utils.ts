export class CommonUtils {
    public static flatMap<T>(source: T): Array<T[keyof T]> {
        return Object.keys(source).map(key => source[key]);
    }

    public static uniqueValues<T>(source: any[], key: string): T[] {
        return source.reduce((r, s) => r.indexOf(s[key]) === -1 ? [...r, s[key]] : r, []);
    }
}
