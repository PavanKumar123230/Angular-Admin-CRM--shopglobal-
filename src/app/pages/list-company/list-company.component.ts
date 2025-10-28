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

  constructor(private api: AdminService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.GetCompanyData();
  }
  GetCompanyData(): void {
    this.api.GetCompanies().subscribe({
      next: (res: any) => {
  console.log(res)
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
    if (!term) return this.companyList;
    return this.companyList.filter((company) =>
      company.name?.toLowerCase().includes(term)
    );
  }
}
