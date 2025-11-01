import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { VendorComponent } from './pages/vendor/vendor.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { ListCompanyComponent } from './pages/list-company/list-company.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

  // { path: 'addstore', component: AddStoreComponent, canActivate: [authGuard] },
  { path: 'addcompany', component: CreateCompanyComponent, canActivate: [authGuard] },
  { path: 'company', component: CreateCompanyComponent,  },

  { path: 'vendor', component: VendorComponent, canActivate: [authGuard] },
  { path: 'subcription', component: SubscriptionComponent, canActivate: [authGuard] },
  { path: 'companies', component: ListCompanyComponent, canActivate: [authGuard] },


  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }, // wildcard route to handle unknown paths
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
