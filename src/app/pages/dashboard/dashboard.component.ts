import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Case } from "src/app/models/case";
import { Vaccine, VaccineResponse } from "src/app/models/vaccine";
import { CovidService } from "src/app/services/covid.service";
import { LoaderService } from "src/app/services/loader.service";
import { History, NewDate } from "src/app/models/history";
import { ChartData } from "src/app/models/chartData";
import { FilterOptions } from "src/app/enums/common.enum";
import { takeWhileAlive, AutoUnsubscribe } from "take-while-alive";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
@AutoUnsubscribe()
export class DashboardComponent implements OnInit {
  selectedCountry = "Poland";
  case?: Case;
  vaccine?: Vaccine;
  showStatistics = false;
  history?: History;
  chartData: ChartData[] = [];
  private onDestroy$: Subject<void> = new Subject();

  constructor(
    private loaderService: LoaderService,
    private covidService: CovidService
  ) {}

  ngOnInit() {
    this.getCaseByCountry();
    this.getVaccineByCountry();
    this.getHistory();

    // const data = new ChartData();
    // data.name = "Test"
    // data.drilldown = "Test"
    // data.y = 1
    // this.chartData.push(data)
    // const data2 = new ChartData();
    // data2.name = "Test2"
    // data2.drilldown = "Test2"
    // data2.y = 2
    // this.chartData.push(data2)
  }

  // Case ByCountry
  getCaseByCountry() {
    this.loaderService.updateStatus({ status: true });
    this.covidService
      .getCaseByCountry(this.selectedCountry)
      .pipe(takeWhileAlive(this))
      .subscribe((res) => {
        this.case = res.All;
        this.showStatistics = true;
        this.loaderService.updateStatus({ status: false });
      });
  }

  //
  getVaccineByCountry() {
    this.covidService
      .getVaccineByCountry(this.selectedCountry)
      .pipe(
        takeWhileAlive(this),
        tap((res: VaccineResponse) => {
          Object.assign(res.All, {
            percent: res.All
              ? (
                  (res.All.people_partially_vaccinated * 100) /
                  res.All.population
                ).toFixed(2)
              : 0,
          });
        })
      )
      .subscribe((res) => {
        this.vaccine = res.All;
      });
  }

  getHistory() {
    this.covidService
      .getHistory(this.selectedCountry)
      .pipe(takeWhileAlive(this))
      .subscribe((res) => {
        this.history = res.All;
    
        this.onFilterItemSelect(FilterOptions.LAST_WEEK);
      });
  }

  onFilterItemSelect(id: FilterOptions) {
    let lastDays: NewDate[];

    switch (id) {
      case FilterOptions.LAST_WEEK:
      default:
        lastDays = this.history!.newDates.slice(0, 7);
        break;
      case FilterOptions.LAST_MONTH:
        lastDays = this.history!.newDates.slice(0, 30);
        break;
      case FilterOptions.LAST_YEAR:
        lastDays = this.history!.newDates.slice(0, 365);
        break;
    }

    let chartData = [];
    for (let item in lastDays) {
      const data = new ChartData();
      data.name = lastDays[item].date;
      data.drilldown = lastDays[item].date;
      data.y = lastDays[item].countByDay;
      chartData.unshift(data);
    }

    this.chartData = chartData;
  }

  // Change Country
  changedCountry(event: any) {
    if (event.selectedCountry != null) {
      this.showStatistics = false;
      this.case = undefined;
      this.vaccine = undefined;
      this.selectedCountry = event.selectedCountry;
      this.getCaseByCountry();
      this.getVaccineByCountry();
      this.getHistory();
    }
  }
}
