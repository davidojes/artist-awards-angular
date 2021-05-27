import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn: boolean = false;

  constructor() { }

  getUserLoggedIn() {
    return this.userLoggedIn;
  }

  getUserId() {
    var userId = this.getUserProperty("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid");
    return userId;
  }


  /**
   * 
   * helper functions
   * 
   */

   setUserLoggedIn(value = null) {
    if (value != null) this.userLoggedIn = value;
    else this.userLoggedIn = !this.userLoggedIn;
  }

  getUserProperty(propertyName) {
    var decodedAccessToken = this.getDecodedAccessToken();
    var property = decodedAccessToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
    return property;
  }

  getAccessToken() {
    var accessToken = this.getCookie("accessToken");
    return accessToken;
  }

  getDecodedAccessToken() {
    var decodedAccessToken = this.decodeToken(this.getAccessToken());
    console.log(decodedAccessToken);
    return decodedAccessToken;
  }

  getCookie(cookieName) {
    cookieName = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) == 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "Not found"
  }

  decodeToken(token) {
    return jwt_decode(token);
  }
}
