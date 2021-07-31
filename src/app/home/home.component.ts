import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {PollService } from '../services/poll.service';
import {Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private pollService: PollService) { }

  popularPolls = [];

  async ngOnInit() {
    this.popularPolls = await this.pollService.getPopularPolls();
  }

  @Input() pollId = ''
  errorMessage = ''
  // @Output() pollIdChange = new EventEmitter<string>();

  async checkForPoll() {
    console.log(this.pollId)
    var pollExists = await this.pollService.checkForPoll(this.pollId);
    console.log(pollExists);

    if(pollExists) {this.router.navigate(['/poll', this.pollId]);}
    else this.errorMessage = 'Sorry, that poll does not exist'; 
  }

  openPoll(poll) {
    this.router.navigate(['/poll', poll.id]);
  }
}
