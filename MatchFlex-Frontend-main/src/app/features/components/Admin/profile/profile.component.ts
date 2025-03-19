import { Component, type OnInit } from "@angular/core"
import { SidebarComponent } from "../sidebar/sidebar.component"
import { NgClass, NgForOf, NgStyle } from "@angular/common"

interface User {
  name: string
  role: string
  avatar: string
  email: string
  phone: string
  location: string
  joinedDate: string
  bio: string
}

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [SidebarComponent, NgStyle, NgForOf, NgClass],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: User = {
    name: "John Doe",
    role: "Administrator",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinedDate: "January 15, 2022",
    bio: "Experienced administrator with a passion for streamlining processes and improving user experiences. Always looking for new ways to innovate and enhance our systems.",
  }

  constructor() {}

  ngOnInit(): void {
  }

  editProfile(): void {
    console.log("Edit profile clicked")
  }

  changePassword(): void {
    console.log("Change password clicked")
  }
}

