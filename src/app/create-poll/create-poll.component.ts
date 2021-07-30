import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PollService } from '../services/poll.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  constructor(private pollService: PollService, private router: Router, private userService: UserService) { }

  createOptionInput
  @ViewChild('optionscontainer') container: ElementRef;

  ngOnInit(): void {
  }

  errorMessage = '';

  createOption() {
    // insert new card and find it
    // console.log(this.createOptionInput);
    if (!this.createOptionInput || this.createOptionInput.trim().length === 0) {
      this.errorMessage = 'Please enter a some text to add a poll option';
      setTimeout(() => { this.errorMessage = '' }, 3000);
      return;
    }
    this.container.nativeElement.insertAdjacentHTML('beforeend', `<div class="column is-one-quarter"><div class="card"><header class="card-header"><p class="card-header-title is-centered has-text-weight-normal"><input class="created-card-input input" value=${this.createOptionInput} /></p></header></div></div>`)
    var cards = Array.from(document.getElementsByClassName('card') as HTMLCollectionOf<HTMLElement>)
    var card = cards[cards.length - 1];

    // add remove button to new card
    card.insertAdjacentHTML('beforeend', '<footer class="card-footer has-background-danger"><a class="card-footer-item has-text-white">Remove Option</a></footer>')
    var removeButton = card.querySelector("footer");
    removeButton.addEventListener('click', (event) => this.removeOption(event.target))

    this.createOptionInput = '';
    var createOptionInputField = document.getElementById('createOptionInput');
    createOptionInputField.focus();
  }

  removeOption(target) {
    // find closest div that's a child of the main card container and remove it (that means each individual card)
    console.log(target);
    var targetCard = target.closest("#optionsContainer > div")
    console.log(targetCard);
    targetCard.remove();
  }

  async createPoll() {
    var pollName = (<HTMLInputElement>document.getElementById("pollName")).value;
    // console.log(pollName);
    if (!pollName) {
      this.errorMessage = 'Please enter a name for your poll';
      setTimeout(() => { this.errorMessage = '' }, 3000);
      return;
    }

    var optionInputs = <HTMLInputElement[]>Array.from((document.getElementsByClassName("created-card-input")));
    var pollOptions = [];
    optionInputs.forEach((option) => pollOptions.push({"content": option.value}))
    // console.log(pollOptions);

    var pollObject = {
      "title": pollName,
      "creatorId": this.userService.getUserId(),
      "statusId": 1,
      "pollOptions": pollOptions
    }

    var createPollRequestBody = JSON.stringify(pollObject);
    // console.log(createPollRequestBody);

    var response = await this.pollService.createPoll(createPollRequestBody);
    // console.log(response);
    
    this.router.navigate(['/poll', response.id]);
  }

}
