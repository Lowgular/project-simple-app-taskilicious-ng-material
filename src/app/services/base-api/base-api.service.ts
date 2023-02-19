import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export abstract class BaseApiService<T> {
    constructor(protected readonly httpClient: HttpClient) { }

    get(url: string): Observable<T> {
        return this.httpClient.get<T>(url).pipe(catchError(this.handleError));
    }

    getAll(url: string): Observable<T[]> {
        return this.httpClient.get<T[]>(url).pipe(catchError(this.handleError));
    }

    post(url: string, body: any): Observable<T> {
        return this.httpClient.post<T>(url, body);
    }

    put(url: string, body: any): Observable<T> {
        return this.httpClient.put<T>(url, body);
    }
    delete(url: string): Observable<T> {
        return this.httpClient.delete<T>(url);
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error?.error?.message}`;
        } else {
            errorMessage = `Error Code: ${error?.status} Error Occured in Api Call :-(`;
        }
        return throwError(() => {
            return errorMessage;
        });
    }
}
