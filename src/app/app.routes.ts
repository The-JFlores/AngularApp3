


import { Routes } from '@angular/router';
import { BookList } from './pages/book-list/book-list';
import { BookAdd } from './pages/book-add/book-add';
import { BookUpdate } from './pages/book-update/book-update';

export const routes: Routes = [
  // Redirect the default path to the book list page
  { path: '', redirectTo: 'list', pathMatch: 'full' },

  // Route for displaying all books
  { path: 'list', component: BookList },

  // Route for adding a new book
  { path: 'add', component: BookAdd },

  // Route for updating an existing book
  { path: 'update/:id', component: BookUpdate },

  // Redirect unknown routes to the book list page
  { path: '**', redirectTo: 'list' }
];