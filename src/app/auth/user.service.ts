import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private path: string = '/user';

  constructor(
    private http: HttpClient
  ) { }

  public registration(user: User) {
    return this.http.post(environment.apiUrl + this.path, user);
  }

  public login(user: User) {
    return this.http.post(environment.apiUrl + this.path + '/login', user);
  }

  public forgot(user: Partial<User>) {
    return this.http.post(environment.apiUrl + this.path + '/forgot', user);
  }

  public isValidToken(token: string): boolean {
    let dataChunk = token.split('.')[1];
    let tokenData = JSON.parse(atob(dataChunk));

    return tokenData.exp * 1000 > new Date().getTime();
  }
}
