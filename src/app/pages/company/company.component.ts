import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyForm!: FormGroup;
  loading = false;
  successData: any = null;
  private successModal: any;

  constructor(
    private fb: FormBuilder,
    private api: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ],
      
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      state: ['', Validators.required],
      parentCompanyId: ['', Validators.required]
    });
  }
  // createCompany(): void {
  //   console.log('🟡 Create Company clicked');
  
  //   if (this.companyForm.invalid) {
  //     console.warn('❌ Form is invalid', this.companyForm.value);
  //     this.companyForm.markAllAsTouched();
  //     this.toastr.error('Please fill all required fields');
  //     return;
  //   }
  
  //   console.log('✅ Form is valid. Payload:', this.companyForm.value);
  
  //   this.loading = true;
  //   console.log('⏳ API call started');
  
  //   this.api.AddCompany(this.companyForm.value).subscribe({
  //     next: (res) => {
  //       console.log('Company created successfully:', res);
  //       this.toastr.success('Company created successfully!');
  //       this.companyForm.reset();
  //       this.loading = false;
  //       console.log('🔁 Form reset & loading stopped');
  //       // Redirect after success
  //       setTimeout(() => {
  //         console.log('➡️ Redirecting to login page');
  //         window.location.href = 'https://nextlogisticss.com/cloud/clogin';
  //       }, 1000);
  //     },
  //     error: (err) => {
  //       console.error('🔥 Error while creating company:', err);
  //       this.loading = false;
  //       this.toastr.error(err?.error?.msg || 'Error creating company');
  //     },
  
  //     complete: () => {
  //       console.log('✅ Create Company API completed');
  //     }
  //   });
  // }
  createCompany(): void {
    console.log('🟡 Create Company clicked');
  
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields');
      return;
    }
  
    this.loading = true;
  
    this.api.AddCompany(this.companyForm.value).subscribe({
      next: (res) => {
        console.log('🎉 Company created:', res);
  
        // Store credentials BEFORE reset
        this.successData = {
          email: this.companyForm.value.email,
          password: this.companyForm.value.password
        };
  
        this.loading = false;
  
        // Open modal SAFELY
        setTimeout(() => {
          const modalEl = document.getElementById('successModal');
          if (modalEl) {
            this.successModal = new (window as any).bootstrap.Modal(modalEl, {
              backdrop: 'static',
              keyboard: false
            });
            this.successModal.show();
            console.log('✅ Success modal opened');
          }
        }, 100);
  
        // Reset form AFTER modal opens
        this.companyForm.reset();
      },
  
      error: (err) => {
        this.loading = false;
        this.toastr.error(err?.error?.msg || 'Error creating company');
      }
    });
  }
  

  showPassword = false;

togglePassword(): void {
  this.showPassword = !this.showPassword;
}
allowOnlyNumbers(event: KeyboardEvent): void {
  const charCode = event.which || event.keyCode;

  // Allow backspace, delete, arrow keys
  if ([8, 46, 37, 39].includes(charCode)) {
    return;
  }
  // Block non-numbers
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
redirectToLogin(): void {
  window.location.href = 'https://nextlogisticss.com/cloud/clogin';
}


}
