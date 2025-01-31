import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  static required(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : { required: message };
    };
  }

  static email(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(control.value) ? null : { email: message };
    };
  }

  static minLength(length: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value?.length >= length ? null : { minlength: message };
    };
  }

  static maxLength(length: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value?.length <= length ? null : { maxlength: message };
    };
  }

  static minAgeFromdate(minAge: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const birthDate = new Date(control.value);
      if (isNaN(birthDate.getTime())) return null; // Invalid date
  
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
    
      const isBeforeBirthday = monthDiff < 0 || 
        (monthDiff === 0 && today.getDate() < birthDate.getDate());
  
      const actualAge = age - (isBeforeBirthday ? 1 : 0);
  
      return actualAge >= minAge ? null : { minAge: message };
    };
  }


  static eventDateValidator(minDate: Date = new Date()): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0);

      const comparisonDate = new Date(minDate);
      comparisonDate.setHours(0, 0, 0, 0);
      if (selectedDate < comparisonDate) {
        return { invalidDate: 'The date cannot be in the past.' };
      }
      
      return null;
    };
  }
  
}