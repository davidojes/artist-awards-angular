import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn
  

  constructor(private http: HttpClient, private router: Router) { }

  async getUserLoggedIn() {
    var tokenExpired = this.isTokenExpired();
    console.log("Token expired: " + tokenExpired);
    if (tokenExpired == null) return false;
    else if (tokenExpired) {
      var tryAuthentication = await this.refreshToken();
      if (!tryAuthentication) {
        this.setUserLoggedIn(false);
      }
      else {
        var d = new Date();
        console.log("Token Refreshed: " + tryAuthentication + " @ " + d.toTimeString());
        this.setUserLoggedIn(true);
      }
    }
    else this.userLoggedIn = true;
    return this.userLoggedIn;
  }

  getUserId() {
    var userId = this.getTokenProperty("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid");
    return userId;
  }

  getUserName() {
    var userName = this.getTokenProperty("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
    return userName;
  }

  async login(credentials) {
      await this.http.post("https://localhost:44399/api/auth/login", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        withCredentials: true
      }).toPromise()
        .then(() => {
          this.setUserLoggedIn(true);
        });
        // .catch(error => console.log(error))
  }

  async register(credentials) {
    await this.http.post("https://localhost:44399/api/auth/register", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    }).toPromise()
      .then(() => {
        this.setUserLoggedIn(true);
      });
      // .catch(error => console.log(error))
}

  async logout() {
    await this.http.post<any>("https://localhost:44399/api/auth/logout", '', {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    }).toPromise()
    .then(() => {
      this.setUserLoggedIn(false); 
      this.router.navigate(['/login']).then(() => {window.location.reload()});
    });
  }

  async refreshToken() {
    var result = false;
    await this.http.post<any>("https://localhost:44399/api/auth/refreshtoken", '', {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    }).toPromise()
      .then(response => { result = true; })
      .catch(error => { console.log(error) })
    return result;
  }


  /**
   * 
   * helper functions
   * 
   */

  isTokenExpired() {
    var expiryDate = this.getTokenProperty("exp");
    if (expiryDate == null) return null;
    var currentDate = Math.round(Date.now() / 1000)
    if (currentDate > expiryDate) return true;
    else return false;
  }

  setUserLoggedIn(value) {
    this.userLoggedIn = value;
  }

  getTokenProperty(propertyName) {
    var decodedAccessToken = this.getDecodedAccessToken();
    if (decodedAccessToken == null) return null;
    var property = decodedAccessToken[propertyName];
    return property;
  }

  getAccessToken() {
    var accessToken = this.getCookie("accessToken");
    if (!accessToken) return null;
    return accessToken;
  }

  getDecodedAccessToken() {
    var accessToken = this.getAccessToken();
    if (accessToken == null) return null;
    var decodedAccessToken = this.decodeToken(accessToken);
    return decodedAccessToken;
  }

  getCookie(cookieName) {
    cookieName = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie) {
      var cookieArray = decodedCookie.split(';');
      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
    }
    return null;
  }

  decodeToken(token) {
    return jwt_decode(token);
  }
}
