import { Component, OnInit } from '@angular/core';
import { PollService } from "../poll.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  poll;

  constructor(private route: ActivatedRoute, private pollService: PollService) { }

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const pollId = String(routeParams.get("pollId"));
    this.poll = await this.pollService.getPoll(pollId);
    // console.log(this.poll);
  }

}
