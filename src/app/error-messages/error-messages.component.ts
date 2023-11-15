import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { getValidatorErrorMessage } from '../validators-utils';


@Component({
  selector: '[app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-container *ngIf="errorMessage !== null">{{errorMessage}}
  </ng-container>`,
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
