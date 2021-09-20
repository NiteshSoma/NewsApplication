import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { register } from '../app/model/register';
import { login } from '../app/model/login';
// import { edit } from '../app/model/edit';
import { user } from '../app/model/user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  getusers(userr: user): Observable<any> {
    console.log('GET USER');

    return this.httpClient
      .post<any>(`http://localhost:8081/api/users`, userr, {
        headers: new HttpHeaders().set('responseType', 'text'),
      })
      .pipe(
        map((userData) => {
          sessionStorage.setItem('username', userr.username);
          let tokenStr = userData.token;
          localStorage.setItem('token', tokenStr);
          return userData;
        })
      );
  }

  addUser(register: register): Observable<register> {
    return this.httpClient.post<register>(
      'http://localhost:8081/api/users/create',
      register
    );
  }

  findAllUsers() {
    return this.httpClient.get(`http://localhost:8081/api/AllUsers`);
  }

  // editUser(edit: edit, id:number): Observable<register> {
  //   return this.httpClient.put<register>(`http://localhost:8080/api/users?=${id}`, edit);
  // }

  setBearerToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  getBearerToken() {
    return sessionStorage.getItem('token');
  }
}
