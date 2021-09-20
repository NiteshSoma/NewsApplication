import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TopHeadlinesService {
  header = new HttpHeaders({ apiKey: 'd0c53d37ddd941be9808625ace971446' });

  header2 = new HttpHeaders({ apiKey: 'e8f496f5094f41b69dff3b3377815239' });

  api_key = 'e8f496f5094f41b69dff3b3377815239';

  constructor(private httpClient: HttpClient) {}

  getTopHeadlinesCountry(country) {
    return this.httpClient.get<Array<Object>>(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=d0c53d37ddd941be9808625ace971446&pageSize=36`
    );
  }

  getTopHeadlinedSource() {
    return this.httpClient.get<Array<Object>>(
      `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=d0c53d37ddd941be9808625ace971446`
    );
  }

  getTopHeadlinesConCat = (country: string, category: string) => {
    return this.httpClient.get<Array<Object>>(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=d0c53d37ddd941be9808625ace971446&pageSize=36`
    );
  };

  getSearchedNewsInTop(Searchvalue) {
    return this.httpClient.get<Array<Object>>(
      `https://newsapi.org/v2/top-headlines?q=${Searchvalue}&apiKey=e8f496f5094f41b69dff3b3377815239`
    );
  }

  getSources(sources) {
    return this.httpClient.get(
      `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=d0c53d37ddd941be9808625ace971446`
    );
  }
  initSources() {
    return this.httpClient.get(
      'https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key
    );
  }
  initArticles() {
    return this.httpClient.get(
      'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' +
        this.api_key
    );
  }
}
