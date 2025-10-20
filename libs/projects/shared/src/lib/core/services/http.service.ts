import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { API_CONFIG, ApiConfig } from '../config/environment.config';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?: any;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(API_CONFIG);

  /**
   * Builds a full URL using the configured baseUrl.
   */
  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }

    const baseUrl = this.apiConfig.baseUrl.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${path}`;
  }

  /** Performs a GET request. */
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.get<T>(url, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /** Performs a POST request. */
  post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.post<T>(url, body, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /** Performs a PUT request. */
  put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.put<T>(url, body, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /** Performs a PATCH request. */
  patch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.patch<T>(url, body, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /** Performs a DELETE request. */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.delete<T>(url, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /** Centralized HTTP error handling. */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error en la petición';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
    }
    
    console.error('HTTP Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
