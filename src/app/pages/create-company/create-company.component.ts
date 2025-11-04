// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AdminService } from 'src/app/service/admin.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-create-company',
//   templateUrl: './create-company.component.html',
//   styleUrls: ['./create-company.component.scss']
// })
// export class CreateCompanyComponent implements OnInit {
//   Form: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private api: AdminService,
//     private toastr: ToastrService,
//   ) {
//     this.Form = this.fb.group({
//       phone: ['', Validators.required],
//       address: ['', Validators.required],
//       state: ['', Validators.required],
//       customerName: ['', Validators.required],
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       parentCompanyId: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//   }


//   createCompany(): void {
//     try {
//       if (this.Form.invalid) {
//         this.toastr.error('Please fill all required fields');
//         return;
//       }
  
//       const payload = this.Form.value;
//       console.log('payload:', payload);
  
//       this.api.AddCompany(payload).subscribe({
//         next: (res) => {
//           console.log("companyData:", res);
//           this.toastr.success('Company created successfully!');
  
//           this.Form.reset();
  
//           setTimeout(() => {
//             window.location.href = 'https://nextlogisticss.com/cloud/clogin';
          
//           });
//         },
//         error: (err) => {
//           console.error('HTTP error:', err);
//           const errorMsg = err?.error?.msg || 'Error creating company';
//           this.toastr.error(errorMsg);
//         }
//       });
//     } catch (error) {
//       this.toastr.error('Unexpected error occurred');
//       console.error('Caught error:', error);
//     }
//   }
  
  
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
  Form: FormGroup;
  isPublicView = false;

  constructor(
    private fb: FormBuilder,
    private api: AdminService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
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
    // Determine view mode based on route
    const currentPath = this.route.snapshot.routeConfig?.path;
    this.isPublicView = currentPath === 'company';
  }

  createCompany(): void {
    if (this.Form.invalid) {
      this.toastr.error('Please fill all required fields');
      return;
    }

    const payload = this.Form.value;
    this.api.AddCompany(payload).subscribe({
      next: (res) => {
        this.toastr.success('Company created successfully!');
        this.Form.reset();

        setTimeout(() => {
          // ✅ Redirect for public users
          if (this.isPublicView) {
            window.location.href = 'https://nextlogisticss.com/cloud/clogin';
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        }, 800);
      },
      error: (err) => {
        const errorMsg = err?.error?.msg || 'Error creating company';
        this.toastr.error(errorMsg);
      }
    });
  }
}

