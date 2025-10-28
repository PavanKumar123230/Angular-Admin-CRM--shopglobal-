import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VendorComponent } from './pages/vendor/vendor.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { ListCompanyComponent } from './pages/list-company/list-company.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SubscriptionComponent,
    NavbarComponent,
    VendorComponent,
    CreateCompanyComponent,
    ListCompanyComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // ✅ should be before ToastrModule
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }),
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
