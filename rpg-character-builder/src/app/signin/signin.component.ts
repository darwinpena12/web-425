import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Sign In</h1>
    <form
    [formGroup]="signinForm"
    (ngSubmit)="onSubmit()"
    data-testid="signin-form"
    >
      <label for="username">Username:</label>
      <input
        id="username"
        type="text"
        formControlName="username"
        data-testid="username"
        [attr.aria-describedby]="signinForm.controls.username.touched ? 'username-error' : null"
      />
      @if (signinForm.controls.username.invalid && signinForm.controls.username.touched) {
        <p id="username-error" data-testid="username-error" role="alert">
          Username is required and must be at least 3 characters.
        </p>
      }
      
      <label for="access-code">Access Code:</label>
      <input
        id="access-code"
        type="text"
        formControlName="accessCode"
        data-testid="access-code"
        [attr.aria-describedby]="signinForm.controls.accessCode.touched ? 'access-code-error' : null"
      />

      @if (signinForm.controls.accessCode.invalid && signinForm.controls.accessCode.touched) {
        <p id="access-code-error" data-testid="access-code-error" role="alert">
          Access code is required and must be 6 alphanumeric characters.
        </p>
      }

      <button
        type="submit"
        [disabled]="signinForm.invalid"
        data-testid="signin-submit"
      >
        Sign In
      </button>
    </form>
  `
})

export class SigninComponent {
  
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  

  signinForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    accessCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6}$/)]]
  });

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const username = this.signinForm.controls.username.value;
    this.authService.signin(username);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/builder';
    this.router.navigateByUrl(returnUrl);
  }
}