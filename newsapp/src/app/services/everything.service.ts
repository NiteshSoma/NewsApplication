import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EverythingService {
  constructor(private httpClient: HttpClient) {}

  getEveryThingSearch(value) {
    return this.httpClient.get<Array<Object>>(
      `https://newsapi.org/v2/everything?qInTitle=${value}&apiKey=d0c53d37ddd941be9808625ace971446&pageSize=27`
    );
  }

  getEverythingdate(fromDate, toDate) {
    return this.httpClient.get<Array<Object>>(
      `https://newsapi.org/v2/everything?qInTitle=india&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=d0c53d37ddd941be9808625ace971446&pageSize=27`
    );
  }
}
