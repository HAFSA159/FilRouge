import { Component, type OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { NgIf, NgFor, CommonModule } from "@angular/common"
import { v4 as uuidv4 } from "uuid"
import { RouterModule } from "@angular/router"
import { inject } from "@angular/core"

interface ShippingAddress {
  name: string
  street: string
  city: string
  zipCode: string
  country: string
}

interface OrderDetails {
  orderNumber: string
  bandColor: string
  quantity: number
  price: number
  shippingAddress: ShippingAddress
  paymentMethod: string
  lastFourDigits: string
}

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, RouterModule],
  styleUrls: ["./confirmation.component.scss"],
})
export class ConfirmationComponent implements OnInit {
  private router = inject(Router)

  orderDetails: OrderDetails
  showPrintOptions = false

  constructor() {
    this.orderDetails = this.getOrderDetails()
  }

  ngOnInit(): void {}

  getOrderDetails(): OrderDetails {
    const colorData = JSON.parse(localStorage.getItem("colorFormData") || "{}")
    const userInfoData = JSON.parse(localStorage.getItem("userInfoFormData") || "{}")
    const paymentData = JSON.parse(localStorage.getItem("paymentFormData") || "{}")

    const orderNumber = `ORD-${uuidv4().substr(0, 8).toUpperCase()}`

    return {
      orderNumber: orderNumber,
      bandColor: colorData.color || "N/A",
      quantity: colorData.quantity || 0,
      price: (colorData.quantity || 0) * 14.99, // Assuming price per band is $14.99
      shippingAddress: {
        name: userInfoData.name || "N/A",
        street: userInfoData.address || "N/A",
        city: userInfoData.city || "N/A",
        zipCode: userInfoData.zipCode || "N/A",
        country: userInfoData.country || "N/A",
      },
      paymentMethod: "Credit Card",
      lastFourDigits: paymentData.cardNumber ? paymentData.cardNumber.slice(-4) : "N/A",
    }
  }

  togglePrintOptions(): void {
    this.showPrintOptions = !this.showPrintOptions
  }

  downloadReceipt(): void {
    const receiptContent = this.generateReceiptContent()
    const blob = new Blob([receiptContent], { type: "text/plain;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `receipt_${this.orderDetails.orderNumber}.txt`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  generateReceiptContent(): string {
    return `
Order Receipt
-------------
Order Number: ${this.orderDetails.orderNumber}
Band Color: ${this.orderDetails.bandColor}
Quantity: ${this.orderDetails.quantity}
Total Price: $${this.orderDetails.price.toFixed(2)}

Shipping Address:
${this.orderDetails.shippingAddress.name}
${this.orderDetails.shippingAddress.street}
${this.orderDetails.shippingAddress.city}, ${this.orderDetails.shippingAddress.zipCode}
${this.orderDetails.shippingAddress.country}

Payment Method: ${this.orderDetails.paymentMethod}
Card ending in: ${this.orderDetails.lastFourDigits}

Thank you for your order!
    `
  }

  printOrder(): void {
    console.log("Printing order:", this.orderDetails.orderNumber)
    window.print()
  }

  printInvoice(): void {
    console.log("Printing invoice for order:", this.orderDetails.orderNumber)
    window.print()
  }

  returnToHome(): void {
    this.router.navigate(["/"])
  }

  trackOrder(): void {
    this.router.navigate(["/track-order", this.orderDetails.orderNumber])
  }
}

