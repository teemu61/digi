
import { Injectable } from '@angular/core';
import { catchError, flatMap } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Train } from '../model/Train';

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

  getTrains(): Observable<any> {
    let url = BASE_URL + 'live-trains'
    let ret = this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
    ret.subscribe(i => console.log("ret: ",i))
    return ret;
  }

  getTrainById(id: string): Observable<any> {
    let url = BASE_URL +'trains/latest/' + id;
    console.log("url: ",url)
    let ret = this.http.get(url).pipe(
      flatMap(this.extractData),
      catchError(this.handleError)
    );
    return ret;
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
