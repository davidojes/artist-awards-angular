import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PollComponent } from './poll/poll.component';
import { HomeComponent } from './home/home.component';
import {AuthGuardService} from './services/auth-guard.service';
import { CreatePollComponent } from './create-poll/create-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    PollComponent,
    HomeComponent,
    CreatePollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: "", component:HomeComponent},
      // {path: "home", component:HomeComponent},
      {path: "login", component:LoginComponent, canActivate: [AuthGuardService]},
      {path: "register", component:RegisterComponent, canActivate: [AuthGuardService]},
      {path: "poll/:pollId", component:PollComponent},
      // {path: "home", component:HomeComponent, canActivate: [AuthGuardService]},
      {path: "createpoll", component:CreatePollComponent, canActivate: [AuthGuardService]}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
