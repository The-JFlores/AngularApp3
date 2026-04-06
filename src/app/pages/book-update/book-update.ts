

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-update.html',
  styleUrl: './book-update.css'
})
export class BookUpdate implements OnInit {
  // Inject required Angular services
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  // Store error messages shown to the user
  errorMessage: string = '';

  // Store the selected book id
  bookId: number = 0;

  // Store the selected file for upload
  selectedFile: File | null = null;

  // Create the reactive form
  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required]
  });

  // Load the current book data when the component starts
  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (!routeId) {
      this.errorMessage = 'Missing book id.';
      return;
    }

    this.bookId = Number(routeId);
    this.loadBookData();
  }

  // Load the selected book data into the form
  loadBookData(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        const selectedBook = books.find(book => Number(book.id) === this.bookId);

        if (!selectedBook) {
          this.errorMessage = 'Book not found.';
          return;
        }

        this.bookForm.patchValue({
          title: selectedBook.title,
          author: selectedBook.author,
          description: selectedBook.description
        });

        this.errorMessage = '';
      },
      error: (error) => {
  console.error('Error updating book:', error);
  console.error('Backend response:', error.error);

  this.errorMessage =
    error?.error?.message ?? 'Unable to update the book at the moment.';
}
    });
  }

  // Store the selected file when the user picks one
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Submit the updated book data to the backend
  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('id', this.bookId.toString());
    formData.append('title', this.bookForm.value.title ?? '');
    formData.append('author', this.bookForm.value.author ?? '');
    formData.append('description', this.bookForm.value.description ?? '');

    if (this.selectedFile) {
      formData.append('cover', this.selectedFile);
    }

    this.bookService.updateBook(formData).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/list']);
      },
      error: (error) => {
        console.error('Error updating book:', error);
        this.errorMessage = 'Unable to update the book at the moment.';
      }
    });
  }
}