import  { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SmartBandService } from '../../../../core/services/smart-band.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  currentStep = 3;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private smartBandService: SmartBandService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.paymentForm = this.fb.group({
      cardHolder: ['', [Validators.required]],
      cardNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9 ]{19}$')
      ]],
      expiryDate: ['', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{3}$')
      ]]
    });
  }

  formatCardNumber(event: any): void {
    let input = event.target;
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';

    for(let i = 0; i < value.length; i++) {
      if(i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }

    input.value = formattedValue;
  }

  formatExpiryDate(event: any): void {
    let input = event.target;
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    if(value.length >= 2) {
      input.value = value.slice(0,2) + '/' + value.slice(2,4);
    } else {
      input.value = value;
    }
  }

  goToPreviousStep(): void {
    this.router.navigate(['/user-info']);
  }

  onSubmit($event: any): void {
    if (this.paymentForm.valid) {
      let formData = this.paymentForm.value;
      formData.cardNumber = formData.cardNumber.replace(/\s+/g, '');
      this.saveFormData(formData);
      this.router.navigate(['/confirmation']);
    } else {
      this.markFormGroupTouched(this.paymentForm);
    }
  }


  saveFormData(formData: any): void {
    localStorage.setItem('paymentFormData', JSON.stringify(formData));
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.paymentForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.paymentForm.get(fieldName);

    if (!field) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }

    if (fieldName === 'cardNumber') {
      let rawValue = field.value.replace(/\s+/g, '');
      if (rawValue.length !== 16) {
        return 'Please enter a valid 16-digit card number';
      }
    }

    if (field.hasError('pattern')) {
      switch(fieldName) {
        case 'expiryDate':
          return 'Please enter a valid expiry date (MM/YY)';
        case 'cvv':
          return 'Please enter a valid CVV';
        default:
          return 'Invalid input';
      }
    }

    return '';
  }

 goToNextStep(): void {
   if (this.paymentForm.valid) {
     let formData = this.paymentForm.value;
     formData.cardNumber = formData.cardNumber.replace(/\s+/g, '');
     this.saveFormData(formData);

     // Récupérer le groupId du localStorage
     const savedGroupId = localStorage.getItem('selectedGroupId');
     const groupId = savedGroupId ? parseInt(savedGroupId, 10) : 1;

     // Assigner un SmartBand à l'utilisateur pour le groupe spécifique
     this.smartBandService.assignSmartBandToUser(groupId).subscribe({
       next: (smartBand) => {
         console.log('SmartBand assigned successfully', smartBand);
         // Nettoyer le localStorage une fois le paiement effectué
         localStorage.removeItem('selectedGroupId');
         this.router.navigate(['/confirmation']);
       },
       error: (error) => {
         console.error('Error assigning SmartBand', error);
         this.router.navigate(['/confirmation']);
       }
     });
   } else {
     this.markFormGroupTouched(this.paymentForm);
   }
 }
}
