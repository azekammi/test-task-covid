import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Country } from '../models/country';
import { HistoryResponse, NewDate } from '../models/history';
import { VaccineResponse } from '../models/vaccine';
import { CaseResponse } from '../models/case';

@Injectable()
export class CovidService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>("../../assets/countries.json").pipe(
      catchError(this.handleError)
    )
  }

  getCaseByCountry(country: string): Observable<CaseResponse> {
    return this.http.get<CaseResponse>(environment.URL + "cases?country=" + country).pipe(
      catchError(this.handleError)
    )
  }

  getVaccineByCountry(country: string): Observable<VaccineResponse> {
    return this.http.get<VaccineResponse>(environment.URL + "vaccines?country=" + country).pipe(
      catchError(this.handleError)
    )
  }

  getHistory(country: string): Observable<HistoryResponse> {
    return this.http.get<HistoryResponse>(environment.URL + "history?country=" + country + "&status=confirmed").pipe(
      map((res) => {
        res.All.newDates = [];
        let predProp = undefined;

        for(let prop of Object.keys(res.All.dates).reverse()){

          let countByDay = predProp == undefined ? 0 : (res.All.dates[prop] - res.All.dates[predProp]);

          let newDate: NewDate = {
            date: prop,
            allCount: res.All.dates[prop],
            countByDay: countByDay
          }

          res.All.newDates.unshift(newDate)

          predProp = prop;
        }
        
        return res
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
