import { Injectable } from '@angular/core';
import { LearningItem } from 'src/models/LearningItem';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/models/User';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  helper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }


  login(model: User) {

    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {

          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.helper.decodeToken(user.token);
          console.log(this.decodedToken);

        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  ifUserExist(model: any) {
    return this.http.post(this.baseUrl + 'loginAvailable', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }


  // getLearningItems()
  // {
  //   this.http.push('http://localhost:5000/api/content')
  //   .subscribe((response: LearningItem[]) => {
  //     this.Items = response;
  //     this.Item = this.Items[0];
  //   })
  // }
}
