import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userLoggedIn
  userName

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userLoggedIn = this.userService.getUserLoggedIn();
    if (this.userLoggedIn) this.userName = this.userService.getUserName();
  }

}
