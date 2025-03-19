import { Component } from "@angular/core"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isMobileMenuOpen = false

  navItems = [
    { label: "Home", link: "/", active: true },
    { label: "Login", link: "/login" },
    { label: "Matches", link: "/all-groups" },
    { label: "My Matches", link: "/my-matches" },
    { label: "About Us", link: "/about" },
    { label: "Dashboard", link: "/dashboard" },
  ]

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }
}

