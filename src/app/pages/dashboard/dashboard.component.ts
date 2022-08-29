import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Case } from 'src/app/models/case';
import { Vaccine, VaccineResponse } from 'src/app/models/vaccine';
import { CovidService } from 'src/app/services/covid.service';
import { LoaderService } from 'src/app/services/loader.service';
import { History } from 'src/app/models/history';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedCountry = "Azerbaijan"
  case?: Case;
  vaccine?: Vaccine
  showStatistics = false
  history?: History
  private onDestroy$: Subject<void> = new Subject();
  
  constructor(
    private loaderService: LoaderService,
    private covidService: CovidService
  ) { }

  ngOnInit() {
    this.getCaseByCountry()
    this.getVaccineByCountry()
    this.getHistory()
  }

  // Case ByCountry
  getCaseByCountry() {
    this.loaderService.updateStatus({ status: true })
    this.covidService.getCaseByCountry(this.selectedCountry).subscribe(res => {
      this.case = res.All
      this.showStatistics = true
      this.loaderService.updateStatus({ status: false })
    })
  }

  // 
  getVaccineByCountry() {
    this.covidService.getVaccineByCountry(this.selectedCountry).pipe(
      takeUntil(this.onDestroy$),
      tap((res: VaccineResponse) => {
        Object.assign(res.All, {
          percent: (res.All.people_partially_vaccinated * 100 / res.All.population).toFixed(2)
        });
      })).subscribe(res => {
      this.vaccine = res.All
    })
  }

  getHistory() {
    this.covidService.getHistory(this.selectedCountry).subscribe( res => {
      this.history = res.All
    })
  }

  // Change Country
  changedCountry(event: any) {
    if(event.selectedCountry != null) {
      this.showStatistics = false
      this.case = undefined
      this.vaccine = undefined
      this.selectedCountry = event.selectedCountry
      this.getCaseByCountry()
      this.getVaccineByCountry()
      this.getHistory()
    }
  }

}
