

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Inject HttpClient to communicate with the backend API
  private http = inject(HttpClient);

  // Base URL for the PHP backend
  private apiUrl = 'http://localhost/angular-api';

  // Retrieve all books from the backend
  getBooks(): Observable<Book[]> {
    const timestamp = new Date().getTime();
    return this.http.get<Book[]>(`${this.apiUrl}/get_books.php?t=${timestamp}`);
  }

  // Send a new book to the backend
  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_book.php`, book);
  }

  // Update an existing book using form data
  updateBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/update_book.php`, formData);
  }

  // Delete a book from the backend
  deleteBook(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/delete_book.php?id=${id}`);
  }
}