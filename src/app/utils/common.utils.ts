export class CommonUtils {
    public static flatMap<T>(source: T): Array<T[keyof T]> {
        return Object.keys(source).map(key => source[key]);
    }

    public static uniqueValues(source: any[], key: string): string[] {
        return source.reduce((r, s) => r.indexOf(s[key]) === -1 ? [...r, s[key]] : r, []);
    }
}
