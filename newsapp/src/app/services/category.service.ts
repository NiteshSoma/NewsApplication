import { Injectable } from '@angular/core';

let categories = [
  {
    value: 'general',
    viewValue: 'Choose a Category',
  },
  {
    value: 'business',
    viewValue: 'Business',
  },
  {
    value: 'entertainment',
    viewValue: 'Entertainment',
  },
  {
    value: 'health',
    viewValue: 'Health',
  },
  {
    value: 'science',
    viewValue: 'Science',
  },
  {
    value: 'sports',
    viewValue: 'Sports',
  },
  {
    value: 'technology',
    viewValue: 'Technology',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories() {
    return categories;
  }
}
