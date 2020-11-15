import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  loggedUser: any;

  constructor(private http: HttpClient) {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }


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

  changePassword(password: string) {
    const params = new HttpParams()
      .append('newPassword', password.toString());
    return this.http.put(this.baseUrl + this.loggedUser.id.toString() + '/changePassword', {}, { params });
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

removeAccount() {
  return this.http.delete(this.baseUrl + this.loggedUser.id.toString() + '/removeAccount');
}

ifUserExist(model: any) {
  return this.http.post(this.baseUrl + 'loginAvailable', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.helper.isTokenExpired(token);
}

}
