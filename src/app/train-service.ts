
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Train } from './model/Train';

const BASE_URL = 'https://rata.digitraffic.fi/api/v1/';


@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getTrains(): Observable<Train> {
    return this.http.get(BASE_URL + 'live-trains' ).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getTrainById(id: string): Observable<Train> {
    return this.http.get(BASE_URL + 'trains/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


}
