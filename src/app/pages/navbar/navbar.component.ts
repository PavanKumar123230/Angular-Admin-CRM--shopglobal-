import { Component, HostListener } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isDropdownOpen = false;

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-item.dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  constructor(private token:TokenService){}
  signOut(): void {
    this.token.signOut();
    }

}
