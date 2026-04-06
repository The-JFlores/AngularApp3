

// Defines the structure of a Book object in the application
export interface Book {

  // Unique identifier of the book (optional because new books won't have it yet)
  id?: number;

  // Title of the book
  title: string;

  // Author of the book
  author: string;

  // Short description of the book
  description: string;

  // Optional image file name stored in the backend
  cover_image?: string
}