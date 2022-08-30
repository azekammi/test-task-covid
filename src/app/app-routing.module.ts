import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailComponent } from './pages/fail/fail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'github/callback', component: SuccessComponent},
  { path: 'success', component: SuccessComponent},
  { path: 'fail', component: FailComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
