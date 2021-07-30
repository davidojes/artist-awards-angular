import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  constructor() { }

  createOptionInput
  @ViewChild('optionscontainer') container: ElementRef;

  ngOnInit(): void {
  }


  createOption() {
    // insert new card and find it
    console.log(this.createOptionInput);
    this.container.nativeElement.insertAdjacentHTML('beforeend', `<div class="column is-one-quarter"><div class="card"><header class="card-header"><p class="card-header-title is-centered has-text-weight-normal"><input value=${this.createOptionInput} /></p></header></div></div>`)
    var cards = Array.from(document.getElementsByClassName('card') as HTMLCollectionOf<HTMLElement>)
    var card = cards[cards.length - 1];

    // add remove button to new card
    card.insertAdjacentHTML('beforeend', '<footer class="card-footer has-background-danger"><a class="card-footer-item has-text-white">Remove Option</a></footer>')
    var removeButton = card.querySelector("footer");
    removeButton.addEventListener('click', (event) => this.removeOption(event.target))
  }

  removeOption(target) {
    // find closest div that's a child of the main card container and remove it (that means each individual card)
    console.log(target);
    var targetCard = target.closest("#optionsContainer > div")
    console.log(targetCard);
    targetCard.remove();
  }

}
