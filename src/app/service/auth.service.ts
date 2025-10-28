import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// const AUTH_API ='https://shop-global-backend.onrender.com/api/'
const AUTH_API='https://shop-global-backend-8tfu.onrender.com/'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(email:string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'api/shopglobal/main/login',
      {
        email: email,
        password: password,
      },
      httpOptions
    );
  }

}
