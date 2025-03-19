import { Component } from "@angular/core"
import { Router, RouterLink, RouterLinkActive } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  providers: [Router],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route
  }
}

