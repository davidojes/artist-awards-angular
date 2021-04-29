import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });
  
  invalidLogin = false;
  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  

  login() {
    const credentials = JSON.stringify(this.loginForm.value);
    this.http.post("https://localhost:44399/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("authToken", token);
      this.invalidLogin = false;
      console.log(localStorage.getItem("authToken"));
      // this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
      this.errorMessage = err.error.message;
      // console.log(err.error.message);
    });
  }

}
