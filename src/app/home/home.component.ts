import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {PollService } from '../poll.service';
import {Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private pollService: PollService) { }

  ngOnInit(): void {
  }

  @Input() pollId = 'f6505a03-2b49-4ad7-b8d1-b2c8fd392a2f'
  errorMessage = ''
  // @Output() pollIdChange = new EventEmitter<string>();

  async checkForPoll() {
    console.log(this.pollId)
    var pollExists = await this.pollService.checkForPoll(this.pollId);
    console.log(pollExists);

    if(pollExists) {this.router.navigate(['/poll', this.pollId]);}
    else this.errorMessage = 'Sorry, that poll does not exist'; 
  }
}
