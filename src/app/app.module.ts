import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular-highcharts';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HistoryComponent } from './components/history/history.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ChooseCountryComponent } from './components/choose-country/choose-country.component';
import { CovidService } from './services/covid.service';
import { SearchCountryPipe } from './helper/search-country.pipe';
import { SuccessComponent } from './pages/success/success.component';
import { FailComponent } from './pages/fail/fail.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    ChooseCountryComponent,
    HistoryComponent,
    LoaderComponent,
    SearchCountryPipe,
    SuccessComponent,
    FailComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartModule,
    NgSelectModule
  ],
  providers: [
    CovidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
