


import { Routes } from '@angular/router';
import { BookList } from './pages/book-list/book-list';
import { BookAdd } from './pages/book-add/book-add';
import { BookUpdate } from './pages/book-update/book-update';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';

export const routes: Routes = [
  
   // Redirect the default path to the login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Route for user registration
  { path: 'register', component: Register },

  // Route for user login
  { path: 'login', component: Login },

  // Route for displaying all books
  { path: 'list', component: BookList },

  // Route for adding a new book
  { path: 'add', component: BookAdd },

  // Route for updating an existing book
  { path: 'update/:id', component: BookUpdate },

  // Redirect unknown routes to the book list page
  { path: '**', redirectTo: 'login' }
];