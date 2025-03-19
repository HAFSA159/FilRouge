import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SmartBand {
  bandId: string;
  serialNumber: string;
  activationTime: Date;
  status: 'Active' | 'Inactive' | 'Suspended';
  assignedPackages: {
    packageType: string;
    price: number;
  }[];
}

@Component({
  selector: 'app-smart-band-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './smart-band-list.component.html',
  styleUrls: ['./smart-band-list.component.scss']
})
export class SmartBandListComponent {
  smartBands: SmartBand[] = [
    {
      bandId: 'SB001',
      serialNumber: 'SN12345',
      activationTime: new Date('2023-01-15T10:30:00'),
      status: 'Active',
      assignedPackages: [
        { packageType: 'Premium', price: 99.99 },
        { packageType: 'Extra Data', price: 19.99 }
      ]
    },
    {
      bandId: 'SB002',
      serialNumber: 'SN67890',
      activationTime: new Date('2023-02-20T14:45:00'),
      status: 'Inactive',
      assignedPackages: [
        { packageType: 'Basic', price: 49.99 }
      ]
    },
    {
      bandId: 'SB003',
      serialNumber: 'SN11223',
      activationTime: new Date('2023-03-10T09:15:00'),
      status: 'Suspended',
      assignedPackages: []
    }
  ];

}
