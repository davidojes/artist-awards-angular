import { Component, OnInit } from '@angular/core';
import { PollService } from "../poll.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../user.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  poll;
  userVoted = false;

  constructor(private route: ActivatedRoute, private pollService: PollService, private userService: UserService) { }

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const pollId = String(routeParams.get("pollId"));
    this.poll = await this.pollService.getPoll(pollId);
    // console.log(this.poll);
    // console.log(this.poll.userVotes);
    var userVote = this.poll.userVotes.filter((uv) => {
      if(uv.userId == this.userService.getUserId()) {
        return uv;
      }
    });
    if (userVote.length > 0) this.userVoted = true;
    // console.log("User voted: " + this.userVoted);
    // console.log(userVote);
  }

  async vote(pollOption) {
    // console.log(pollOption.votes);
    await this.pollService.vote(pollOption.id)
    // .then(response => console.log(response))
    .catch(error => console.log(error));
    this.userVoted = true;
    this.poll = await this.pollService.getPoll(this.poll.id);
  }

}
