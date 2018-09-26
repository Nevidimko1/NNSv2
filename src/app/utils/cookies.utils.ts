export class CookiesUtils {
    public static getCookie = (cookie_name: string): string => {
        const results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

        if (results) {
            return unescape(results[2]);
        } else {
            return null;
        }
    }
}
