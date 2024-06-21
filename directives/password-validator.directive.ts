import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[passwordValidation]',
  standalone: true,
})
export class PasswordValidatorDirective {
  @Input() passwordValidation!: FormGroup;
  @HostListener('input') onFormInput() {
    const formElement = this.el.nativeElement as HTMLElement;
    const passwordField = formElement
      .querySelector('input[formcontrolname=password]')
      ?.closest('.mdc-text-field--filled');

    const repitePasswordField = formElement
      .querySelector('input[formcontrolname=repitePassword]')
      ?.closest('.mdc-text-field--filled');

    const passwordValue = this.passwordValidation.get('password')?.value;
    const repitePasswordValue =
      this.passwordValidation.get('repitePassword')?.value;
    if (passwordValue !== repitePasswordValue) {
      (passwordField as HTMLElement).style.backgroundColor = '#ffd3d3';
      (repitePasswordField as HTMLElement).style.backgroundColor = '#ffd3d3';
    } else {
      (passwordField as HTMLElement).style.backgroundColor = '#f5f5f5';
      (repitePasswordField as HTMLElement).style.backgroundColor = '#f5f5f5';
    }
  }

  constructor(private el: ElementRef) {}
}
