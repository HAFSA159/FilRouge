import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Stepper {
  color?: string | null;
  userInformations?: {
    firstName?: string;
    lastName?: string;
    shippingAddress?: string;
    city?: string;
    email?: string;
    phoneNumber?: string;
  };
  payments?: {
    cardHolder?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class StepperDataService {
  private dataSubject = new BehaviorSubject<Stepper>({}); // Start with an empty object
  currentData$ = this.dataSubject.asObservable(); // Observable to listen for changes

  constructor() {}

  updateData(newData: Stepper): void {
    const currentData = this.dataSubject.getValue(); // Get existing data

    // 🔹 Deep merge nested objects
    const updatedData: Stepper = {
      ...currentData,
      ...newData,
      userInformations: {
        ...currentData.userInformations,
        ...newData.userInformations, // Merge userInformations instead of replacing it
      },
      payments: {
        ...currentData.payments,
        ...newData.payments, // Merge payments instead of replacing it
      },
    };

    this.dataSubject.next(updatedData); // Update observable
  }

  getData(): Stepper {
    return this.dataSubject.getValue();
  }
}
