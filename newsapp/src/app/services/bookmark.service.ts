import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  recEndpoint: string;
  userId: string;
  constructor(private httpClient: HttpClient) {
    this.recEndpoint = 'http://localhost:8083/api/fav/';
  }
  recAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8083/api/fav/');
  }
  recById(userId: string): Observable<any> {
    console.log('Fav user: ' + userId);
    return this.httpClient.get('http://localhost:8083/api/fav/' + userId);
  }
  addrec(recData) {
    const url = this.recEndpoint;
    return this.httpClient.post(url, recData, {
      responseType: 'text' as 'json',
    });
  }
  remRec(recData: any): Observable<any> {
    console.log('Fav data type: ' + typeof recData);
    var myJSON = JSON.stringify(recData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: myJSON,
    };
    // console.log("FavService: "+ myJSON);
    const url = this.recEndpoint;
    return this.httpClient.delete(url, httpOptions);
  }
}
