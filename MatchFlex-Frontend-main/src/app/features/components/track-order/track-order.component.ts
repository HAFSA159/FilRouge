import { Component, type OnInit, inject } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CommonModule } from "@angular/common"

interface OrderStatus {
  status: "Processing" | "Shipped" | "Out for Delivery" | "Delivered"
  date: string
  description: string
}

@Component({
  selector: "app-track-order",
  templateUrl: "./track-order.component.html",
  standalone: true,
  imports: [CommonModule],
})
export class TrackOrderComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  orderNumber = ""
  orderStatuses: OrderStatus[] = [
    {
      status: "Processing",
      date: "2023-06-01",
      description: "Your order has been received and is being processed.",
    },
    {
      status: "Shipped",
      date: "2023-06-03",
      description: "Your order has been shipped and is on its way.",
    },
    {
      status: "Out for Delivery",
      date: "2023-06-05",
      description: "Your order is out for delivery and will arrive soon.",
    },
    {
      status: "Delivered",
      date: "2023-06-06",
      description: "Your order has been delivered successfully.",
    },
  ]

  currentStatus: OrderStatus

  constructor() {
    this.currentStatus = this.orderStatuses[1]
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.orderNumber = params["id"]
    })
  }

  isCompleted(status: OrderStatus): boolean {
    return this.orderStatuses.indexOf(status) < this.orderStatuses.indexOf(this.currentStatus)
  }

  isCurrent(status: OrderStatus): boolean {
    return status === this.currentStatus
  }

  goBack(): void {
    this.router.navigate(["/confirmation"])
  }
}

