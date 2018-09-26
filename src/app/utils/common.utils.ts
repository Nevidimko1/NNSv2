export class CommonUtils {
    public static flatMap<T>(source: T): Array<T[keyof T]> {
        return Object.keys(source).map(key => source[key]);
    }
}
