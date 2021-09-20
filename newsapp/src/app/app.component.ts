import { Component } from '@angular/core';
import { NewsService } from './shared/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchText = '';
  resultSet: any;
  title = 'newsapp';
  static API_URL = 'http://localhost:8080';
  constructor(private newsService: NewsService) {}
}
