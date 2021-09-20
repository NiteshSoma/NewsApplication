import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fav } from '../model/favourite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  favEndpoint: string;
  userId: string;

  constructor(private httpClient: HttpClient) {
    this.favEndpoint = 'http://localhost:8082/api/fav/';
  }

  favNews() {
    console.log('Favourite');
    const url = this.favEndpoint;
    return this.httpClient.get<Fav[]>(url);
  }

  favById(userId: string): Observable<any> {
    return this.httpClient.get('http://localhost:8082/api/fav/' + userId);
  }

  addfav(favData) {
    const url = this.favEndpoint;
    return this.httpClient.post(url, favData, {
      responseType: 'text' as 'json',
    });
  }

  remfav(favData: any): Observable<any> {
    var myJSON = JSON.stringify(favData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: myJSON,
    };
    // console.log("FavService: "+ myJSON);
    const url = this.favEndpoint;
    return this.httpClient.delete(url, httpOptions);
  }
}
