

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
    return this.http.get<Book[]>(`${this.apiUrl}/get_books.php`);
  }

  // Send a new book to the backend
  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_book.php`, book);
  }

  // Placeholder for updating a book in the future
  updateBook(id: number, book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/update_book.php?id=${id}`, book);
  }

  // Placeholder for deleting a book in the future
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_book.php?id=${id}`);
  }
}