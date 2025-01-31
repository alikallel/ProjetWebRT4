// src/app/shared/validation-message.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({ name: 'validationMessage' })
export class ValidationMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string {
    if (!errors) return '';
    const errorKey = Object.keys(errors)[0];
    return errors[errorKey];
  }
}