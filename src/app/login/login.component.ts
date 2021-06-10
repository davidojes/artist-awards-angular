import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';


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

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private userService: UserService) { }

  async ngOnInit() {
    // var userLoggedIn = this.userService.getUserLoggedIn();
    // if (await this.userService.getUserLoggedIn("Login") == true) this.router.navigate(['home']);
  }



  async login() {
    const credentials = JSON.stringify(this.loginForm.value);
    await this.userService.login(credentials);
    this.router.navigate(["home"]).then(() => { window.location.reload() });
  }

}
