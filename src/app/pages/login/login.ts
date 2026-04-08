

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Inject required Angular services
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Store error messages shown to the user
  errorMessage: string = '';

  // Create the login form
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  // Submit the login data to the backend
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const userData = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.errorMessage = '';
        this.authService.saveUserSession(userData.email);
        this.router.navigate(['/list']);
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this.errorMessage =
          error?.error?.message ?? 'Unable to log in at the moment.';
      }
    });
  }
}