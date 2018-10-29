export class DateUtils {
    public static time = (date: Date = new Date()): string => {
        let hours = date.getHours() as any,
            mins = date.getMinutes() as any,
            secs = date.getSeconds() as any;

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (mins < 10) {
            mins = '0' + mins;
        }
        if (secs < 10) {
            secs = '0' + secs;
        }

        return `${hours}:${mins}:${secs}`;
    }

    public static get offset(): number {
        const date = new Date();
        return (date.getTimezoneOffset() -
            new Date(date.getFullYear(), 0, 1).getTimezoneOffset() +
            new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
        ) * 60000;
    }
}
