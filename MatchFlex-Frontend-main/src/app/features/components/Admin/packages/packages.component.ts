import { Component, type OnInit } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { SidebarComponent } from "../sidebar/sidebar.component"
import { NgClass, NgForOf, NgIf } from "@angular/common"

interface Package {
  id: number
  name: string
  price: number
  features: string[]
}

@Component({
  selector: "app-packages",
  standalone: true,
  imports: [
    SidebarComponent,
    NgForOf,
    NgClass,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: "./packages.component.html",
  styleUrls: ["./packages.component.scss"],
})
export class PackagesComponent implements OnInit {
  packages: Package[] = [
    {
      id: 1,
      name: "Basic",
      price: 9.99,
      features: ["1 User", "5GB Storage", "Basic Support"],
    },
    {
      id: 2,
      name: "Premium",
      price: 19.99,
      features: ["5 Users", "20GB Storage", "Priority Support", "Advanced Analytics"],
    },
    {
      id: 3,
      name: "Pro",
      price: 29.99,
      features: ["Unlimited Users", "100GB Storage", "24/7 Support", "Advanced Analytics", "Custom Integrations"],
    },
  ]

  showAddForm = false
  packageForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.packageForm = this.fb.group({
      name: ["", Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],
      features: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    // You can fetch package data here if needed
  }

  editPackage(packageItem: Package): void {
    console.log("Edit package:", packageItem)
    // Implement edit package functionality
  }

  showAddPackageForm(): void {
    this.showAddForm = true
  }

  hideAddPackageForm(): void {
    this.showAddForm = false
    this.packageForm.reset()
  }

  onSubmit(): void {
    if (this.packageForm.valid) {
      const formValue = this.packageForm.value
      const newPackage: Package = {
        id: Math.max(...this.packages.map((p) => p.id)) + 1,
        name: formValue.name,
        price: formValue.price,
        features: formValue.features.split(",").map((feature: string) => feature.trim()),
      }
      this.packages.push(newPackage)
      this.hideAddPackageForm()
    }
  }
}
