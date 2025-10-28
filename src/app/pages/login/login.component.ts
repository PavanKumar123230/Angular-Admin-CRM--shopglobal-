import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
form:FormGroup;
errorMessage: string = '';
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  constructor(private api:AdminService, private fb:FormBuilder,   private token: TokenService,
    private router: Router, private authservice:AuthService){
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){}

  onSubmit(): void {
    const f = this.form.value;
    this.authservice.login(f.email, f.password).subscribe((res) => {
        this.token.saveToken(res.token);
        this.token.saveUser(res);
        // console.log(res);
        this.reloadPage();
      },
      (err) => {
        this.isLoggedIn = false;
      }
    );
  }

  reloadPage(): void {
    this.router.navigateByUrl('/dashboard');
  }

}
