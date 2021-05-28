import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn: boolean = false;

  constructor() { }

  getUserLoggedIn() {
    var tokenExpired = this.isTokenExpired();
    if (tokenExpired) this.setUserLoggedIn(false);
    else this.setUserLoggedIn(true);
    console.log("Token expired: " + tokenExpired);
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


  /**
   * 
   * helper functions
   * 
   */

  isTokenExpired() {
    var expiryDate = this.getTokenProperty("exp");
    var currentDate = Math.round(Date.now() / 1000)
    // console.log(`current date: ${currentDate}\n expiry date: ${expiryDate}`)

    if (currentDate > expiryDate) return true;
    else return false;
  }

  setUserLoggedIn(value = null) {
    if (value != null) this.userLoggedIn = value;
    else this.userLoggedIn = !this.userLoggedIn;
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
    // console.log(decodedAccessToken);
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
