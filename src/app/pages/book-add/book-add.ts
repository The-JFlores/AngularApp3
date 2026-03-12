

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-add',
  imports: [ReactiveFormsModule],
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

  // Creates the reactive form with validation rules
  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required]
  });

  // Handles form submission
  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const newBook: Book = {
      title: this.bookForm.value.title ?? '',
      author: this.bookForm.value.author ?? '',
      description: this.bookForm.value.description ?? ''
    };

    this.bookService.addBook(newBook).subscribe({
      next: () => {
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