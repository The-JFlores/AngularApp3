

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {

  // Stores the list of books loaded from the backend
  books: Book[] = [];

  // Stores an error message if the request fails
  errorMessage: string = '';

  // Inject the service used to retrieve books
  private bookService = inject(BookService);

  // Load books when the component is initialized
  ngOnInit(): void {
    this.loadBooks();
  }

  // Request the list of books from the backend
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.errorMessage = 'Unable to load books at the moment.';
      }
    });
  }
}