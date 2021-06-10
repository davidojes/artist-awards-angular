import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PollComponent } from './poll/poll.component';
import { HomeComponent } from './home/home.component';
import {AuthGuardService} from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    PollComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: "login", component:LoginComponent, canActivate: [AuthGuardService]},
      {path: "register", component:RegisterComponent, canActivate: [AuthGuardService]},
      {path: "poll/:pollId", component:PollComponent, canActivate: [AuthGuardService]},
      {path: "home", component:HomeComponent, canActivate: [AuthGuardService]},
      {path: "", component:HomeComponent, canActivate: [AuthGuardService]}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
