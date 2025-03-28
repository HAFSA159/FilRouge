import { AuthService } from './../../../core/services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

interface NavItem {
  label: string;
  link: string;
  active?: boolean;
  requiresAuth?: boolean; // Explicitly defined
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  isAuthenticated = false;
  private authSubscription!: Subscription;

  allNavItems: NavItem[] = [
    { label: 'Home', link: '/', active: true, requiresAuth: false },
    { label: 'Login', link: '/login', requiresAuth: false },
    { label: 'Matches', link: '/all-groups', requiresAuth: true },
    { label: 'My Matches', link: '/my-matches', requiresAuth: true },
    { label: 'About Us', link: '/about', requiresAuth: false },
    { label: 'Dashboard', link: '/dashboard', requiresAuth: true },
    { label: 'Logout', link: '/login', requiresAuth: true },

  ];

  navItems: NavItem[] = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
      this.filterNavItems();
      this.cdr.detectChanges();
    });

    // Initial filter
    this.filterNavItems();
  }

  filterNavItems() {
    this.navItems = this.allNavItems.filter(
      (item) =>
        item.requiresAuth === undefined ||
        item.requiresAuth === this.isAuthenticated
    );
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
