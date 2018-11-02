import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Injectable()
export class ApiService {

    public ajax$: Subject<string>;

    constructor(
        private http: Http
    ) {
        this.ajax$ = new Subject<string>();
    }

    public get<T>(url: string): Observable<T> {
        return this.http.get(url).pipe(
            map((response: Response) => {
                try {
                    return response.json();
                } catch (e) {
                    return response.text();
                }
            }),
            finalize(() => this.ajax$.next(url))
        );
    }

    public post<T>(url: string, data: object): Observable<T> {
        const params = new URLSearchParams();
        Object.keys(data).forEach(key => params.set(key, data[key]));

        return this.http.post(
            url,
            params.toString(),
            { headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}) }
        ).pipe(
            map((response: Response) => {
                try {
                    return response.json();
                } catch (e) {
                    return response.text();
                }
            }),
            finalize(() => this.ajax$.next(url))
        );
    }

    public postJson<T>(url: string, data: any): Observable<T> {
        return this.http.post(url, data).pipe(
            map((response: Response) => response.json()),
            finalize(() => this.ajax$.next(url))
        );
    }
}
