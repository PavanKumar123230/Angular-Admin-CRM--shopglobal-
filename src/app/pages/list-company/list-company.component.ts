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

  loading: boolean = false;

  constructor(
    private api: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCompanyData();
  }

  // ================= FETCH COMPANIES =================
  getCompanyData(): void {
    this.loading = true;
    this.currentPage = 1;

    this.api.GetCompanies().subscribe({
      next: (res: any[]) => {
        console.log('API RESPONSE:', res);

        // ✅ API RETURNS ARRAY DIRECTLY
        this.companyList = Array.isArray(res) ? res : [];

        this.loading = false;
        this.toastr.success('Companies loaded successfully');
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.toastr.error('Failed to load companies');
      }
    });
  }

  // ================= SEARCH FILTER =================
  get filteredCompanies(): any[] {
    if (!this.searchTerm.trim()) {
      return this.companyList;
    }

    const term = this.searchTerm.toLowerCase();
    return this.companyList.filter(company =>
      company.name?.toLowerCase().includes(term)
    );
  }

  // ================= PAGINATION =================
  get paginatedCompanies(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCompanies.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }
}
