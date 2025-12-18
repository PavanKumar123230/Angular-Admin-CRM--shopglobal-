// import { Component, OnInit } from '@angular/core';
// import { AdminService } from 'src/app/service/admin.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-list-company',
//   templateUrl: './list-company.component.html',
//   styleUrls: ['./list-company.component.scss'],
// })
// export class ListCompanyComponent implements OnInit {
//   companyList: any[] = [];
//   searchTerm: string = '';

//   constructor(private api: AdminService, private toastr: ToastrService) {}

//   ngOnInit(): void {
//     this.GetCompanyData();
//   }
//   GetCompanyData(): void {
//     this.api.GetCompanies().subscribe({
//       next: (res: any) => {
//   console.log(res)
//         this.companyList = res?.data || res;
//         this.toastr.success('Companies data fetched successfully!');
//       },
//       error: (err) => {
//         console.error(err);
//         this.toastr.error(err?.error?.message || 'Failed to fetch company data');
//       },
//     });
//   }
//   get filteredCompanies() {
//     const term = this.searchTerm.toLowerCase().trim();
//     if (!term) return this.companyList;
//     return this.companyList.filter((company) =>
//       company.name?.toLowerCase().includes(term)
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss'],
})
export class ListCompanyComponent implements OnInit {
  companyList: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private api: AdminService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.GetCompanyData();
  }

  GetCompanyData(): void {
    this.api.GetCompanies().subscribe({
      next: (res: any) => {
        this.companyList = res?.data || res;
        this.toastr.success('Companies data fetched successfully!');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err?.error?.message || 'Failed to fetch company data');
      },
    });
  }

  get filteredCompanies() {
    const term = this.searchTerm.toLowerCase().trim();
    let filtered = !term
      ? this.companyList
      : this.companyList.filter((company) =>
          company.name?.toLowerCase().includes(term)
        );

    // Pagination slice
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    const totalFiltered = !this.searchTerm
      ? this.companyList.length
      : this.companyList.filter((company) =>
          company.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
        ).length;
    return Math.ceil(totalFiltered / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}

