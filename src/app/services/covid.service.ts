import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Country } from '../models/country';
import { HistoryResponse } from '../models/history';
import { VaccineResponse } from '../models/vaccine';
import { CaseResponse } from '../models/case';

@Injectable()
export class CovidService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>("../../assets/countries.json").pipe(
      tap(data => {
        console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    )
  }

  getCaseByCountry(country: string): Observable<CaseResponse> {
    return this.http.get<CaseResponse>(environment.URL + "cases?country=" + country).pipe(
      tap(data => {
        console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    )
  }

  getVaccineByCountry(country: string): Observable<VaccineResponse> {
    return this.http.get<VaccineResponse>(environment.URL + "vaccines?country=" + country).pipe(
      tap(data => {
        console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    )
  }

  getHistory(country: string): Observable<HistoryResponse> {
    return this.http.get<HistoryResponse>(environment.URL + "history?country=" + country + "&status=confirmed").pipe(
      tap(data => {
        console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    )
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = "Error:" + err.error.message;
    } else {
      errorMessage = "System error";
    }
    return throwError(errorMessage);
  }

}
