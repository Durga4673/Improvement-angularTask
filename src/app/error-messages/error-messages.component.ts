import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { getValidatorErrorMessage } from '../validators-utils';


@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent {
  @Input()
  control!: AbstractControl

  constructor(){}

  get errorMessage() {
    for (const validatorName in this.control?.errors) {
        if(this.control.touched)
          return getValidatorErrorMessage(validatorName, this.control.errors[validatorName]);
    }
    return null;
  }
}
