import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


const AUTH_API='https://shop-global-backend-8tfu.onrender.com/';

const AUTH_CRM='https://cargo-backend-bpq4.onrender.com/'

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private token: TokenService) {}

  Signup(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(
      AUTH_API + 'admin/signup',
      {
        userName: data.name,
        email: data.email,
        password: data.password,
      },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  AddCompany(value:{
    phone: number;
    address: string;
    state: string;
    customerName: string;
    name: string;
    email: string;
    password: string;
    parentCompanyId: string;

  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_CRM + 'company/subsidiary/register',  { 
        phone: value.phone,
        address: value.address,
        state: value.state,
        customerName: value.customerName,
        name: value.name,
        email: value.email,
        password: value.password,
        parentCompanyId: value.parentCompanyId,
      },
       httpOptions 
    );
  }



  
  vendorCreation(value: {
    name: string;
    companyName: string;
    displayName: string;
    address: string;
    workPhone: number;
    mobile: number;
    bankDetails: {
      accountNumber: number;
      accountName: string;
      bankName: string;
      branchName: string;
      ifscCode: string;
    };
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
  
    return this.http.post(
      AUTH_CRM + 'vendor/create',
      {
        name: value.name,
        companyName: value.companyName,
        displayName: value.displayName,
        address: value.address,
        workPhone: value.workPhone,
        mobile: value.mobile,
        bankDetails: {
          accountNumber: value.bankDetails.accountNumber,
          accountName: value.bankDetails.accountName,
          bankName: value.bankDetails.bankName,
          branchName: value.bankDetails.branchName,
          ifscCode: value.bankDetails.ifscCode
        }
      },
      httpOptions
    );
  }
  addSubscription(value: {
    plan: string;
    bookingLimit: number;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
  
    return this.http.post(
      AUTH_CRM + 'company/subscription',
      {
        plan: value.plan,
        bookingLimit: value.bookingLimit
      },
      httpOptions
    );
  }


  


  getVendor(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
      return this.http.get(AUTH_CRM + 'vendor/get',
       httpOptions);
  }



  GetCompanies(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
      return this.http.get(AUTH_CRM +'company/get-companies',
       httpOptions);
  }





}
