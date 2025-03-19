import { Component, type OnInit } from "@angular/core"
import {AllGroupsComponent} from '../all-groups/all-groups.component';


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [
    AllGroupsComponent
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

  scrollToSection(elementId: string): void {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }


  onLearnMoreClick(): void {
    console.log("Learn More clicked")
  }

  onSubmitForm(formData: any): void {
    console.log("Form submitted", formData)
  }
}

