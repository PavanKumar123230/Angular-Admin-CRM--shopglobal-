import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  vendorList: any[] = [];
  filteredVendors: any[] = [];
  searchText: string = '';

  constructor(
    private api: AdminService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.GetVendorData();
  }

  GetVendorData(): void {
    this.api.getVendor().subscribe({
      next: (res: any) => {
        this.vendorList = res?.data || res;
        this.filteredVendors = [...this.vendorList];
        this.toastr.success('Vendor data fetched successfully!');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err?.error?.message || 'Failed to fetch vendor data');
      }
    });
  }

  // 🔍 Live search filtering
  filterVendors(): void {
    const search = this.searchText.toLowerCase().trim();
    this.filteredVendors = this.vendorList.filter(vendor =>
      (vendor.displayName?.toLowerCase().includes(search)) ||
      (vendor.name?.toLowerCase().includes(search)) ||
      (vendor.companyName?.toLowerCase().includes(search)) ||
      (vendor.address?.toLowerCase().includes(search)) ||
      (vendor.mobile?.toString().includes(search)) ||
      (vendor.workPhone?.toString().includes(search))
    );
  }
}
