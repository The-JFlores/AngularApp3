

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  // Inject required Angular services
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Store error messages shown to the user
  errorMessage: string = '';

  // Create the registration form
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Submit the registration data to the backend
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const userData = {
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? ''
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.errorMessage = '';
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.errorMessage =
          error?.error?.message ?? 'Unable to register at the moment.';
      }
    });
  }
}