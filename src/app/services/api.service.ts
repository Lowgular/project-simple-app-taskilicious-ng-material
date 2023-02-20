import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  constructor(protected readonly httpClient: HttpClient) {}

  get(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error?.error?.message}`;
    } else {
      errorMessage = `Error Code: ${error?.status} Error Occured in Api Call`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
