import { Component, type OnInit } from "@angular/core"
import { NgClass, NgForOf, NgStyle } from '@angular/common';
import {SidebarComponent} from '../sidebar/sidebar.component';

interface Metric {
  label: string
  value: string
  changePercentage: number
  icon: string
  iconBgColor: string
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  imports: [
    NgForOf,
    NgClass,
    NgStyle,
    SidebarComponent
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  metrics: Metric[] = [
    {
      label: "Today's Money",
      value: "$53,000",
      changePercentage: 55,
      icon: "wallet",
      iconBgColor: "bg-[#BA5751]",
    },
    {
      label: "Today's Users",
      value: "2,300",
      changePercentage: 3,
      icon: "globe",
      iconBgColor: "bg-[#BA5751]",
    },
    {
      label: "New Clients",
      value: "+3,462",
      changePercentage: -2,
      icon: "user-plus",
      iconBgColor: "bg-[#BA5751]",
    },
    {
      label: "Sales",
      value: "$103,430",
      changePercentage: 5,
      icon: "shopping-cart",
      iconBgColor: "bg-[#BA5751]",
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getIconPath(icon: string): string {
    switch (icon) {
      case 'wallet':
        return 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z';
      case 'globe':
        return 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9';
      case 'user-plus':
        return 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z';
      case 'shopping-cart':
        return 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z';
      default:
        return '';
    }
  }
}
