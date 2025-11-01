import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
  Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: AdminService,
    private toastr: ToastrService,
  ) {
    this.Form = this.fb.group({
      phone: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      customerName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      parentCompanyId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  // createCompany(): void {
  //   try {
  //     if (this.Form.invalid) {
  //       this.toastr.error('Please fill all required fields');
  //       return;
  //     }
  //     const payload = this.Form.value; 
  //     console.log('payload:', payload);
  
  //     this.api.AddCompany(payload).subscribe({
  //       next: (res) => {
  //         console.log("companyData:", res);
  //         this.toastr.success('Company created successfully!');
          
  //         this.Form.reset();
  //       },
  //       error: (err) => {
  //         console.error('HTTP error:', err);
  //         // Show specific backend message if available
  //         const errorMsg = err?.error?.msg || 'Error creating company';
  //         this.toastr.error(errorMsg);
  //       }
  //     });
  //   } catch (error) {
  //     this.toastr.error('Unexpected error occurred');
  //     console.error('Caught error:', error);
  //   }
  // }

  createCompany(): void {
    try {
      if (this.Form.invalid) {
        this.toastr.error('Please fill all required fields');
        return;
      }
  
      const payload = this.Form.value;
      console.log('payload:', payload);
  
      this.api.AddCompany(payload).subscribe({
        next: (res) => {
          console.log("companyData:", res);
          this.toastr.success('Company created successfully!');
  
          this.Form.reset();
  
          // ✅ Redirect after short delay (optional for smooth UX)
          setTimeout(() => {
            window.location.href = 'https://nextlogisticss.com/cloud/clogin';
          
          });
        },
        error: (err) => {
          console.error('HTTP error:', err);
          const errorMsg = err?.error?.msg || 'Error creating company';
          this.toastr.error(errorMsg);
        }
      });
    } catch (error) {
      this.toastr.error('Unexpected error occurred');
      console.error('Caught error:', error);
    }
  }
  
  
}
