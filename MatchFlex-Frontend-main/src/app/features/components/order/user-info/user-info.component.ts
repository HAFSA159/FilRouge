import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './user-info.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserInfoComponent implements OnInit {
  userForm!: FormGroup;
  currentStep = 2;

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private phonePattern = /^(?:\+212|0)([5-7]\d{8})$/;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      shippingAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(this.phonePattern)
      ]]
    });
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = this.emailPattern.test(control.value);
      return valid ? null : { 'invalidEmail': { value: control.value } };
    };
  }

  goToPreviousStep(): void {
    this.router.navigate(['/color-band-choice']);
  }

  goToNextStep(): void {
    if (this.userForm.valid) {
      this.saveFormData();
      this.router.navigate(['/payment']);
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  saveFormData(): void {
    const formData = this.userForm.value;
    localStorage.setItem('userFormData', JSON.stringify(formData));
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);

    if (!field) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }

    if (field.hasError('pattern')) {
      if (fieldName === 'email') {
        return 'Please enter a valid email address (e.g., example@domain.com)';
      }
      if (fieldName === 'phoneNumber') {
        return 'Please enter a valid phone number (e.g.,+212) 666666666)';
      }
    }

    return '';
  }
}
