import { Component, Input, Output, EventEmitter, ContentChild } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent {
  @Input() title = '';
  @Input() submitText = 'Submit';
  @Output() formSubmit = new EventEmitter<void>();

  handleSubmit() {
    this.formSubmit.emit();
  }
}