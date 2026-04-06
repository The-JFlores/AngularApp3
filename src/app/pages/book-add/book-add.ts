

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';


@Component({
  selector: 'app-book-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-add.html',
  styleUrl: './book-add.css'
})
export class BookAdd {
  // Inject the required Angular services
  private formBuilder = inject(FormBuilder);
  private bookService = inject(BookService);
  private router = inject(Router);

  // Stores an error message if the request fails
  errorMessage: string = '';

  // Stores the selected file for upload
  selectedFile: File | null = null;

  // Creates the reactive form with validation rules
  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required]
  });

  // Stores the selected file when the user picks one
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
  }
}

  // Handles form submission
  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('title', this.bookForm.value.title ?? '');
    formData.append('author', this.bookForm.value.author ?? '');
    formData.append('description', this.bookForm.value.description ?? '');

    if (this.selectedFile) {
    formData.append('cover', this.selectedFile);
  }
  console.log('Submitting book form data');

  this.bookService.addBook(formData).subscribe({

      next: (response) => {
        console.log('Book added successfully:', response);
        this.errorMessage = '';
        this.bookForm.reset();
        this.router.navigate(['/list']);
      },
      error: (error) => {
        console.error('Error adding book:', error);
        this.errorMessage = 'Unable to add the book at the moment.';
      }
    });
  }
}