import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  constructor() { }

  createOptionInput
  @ViewChild('optionscontainer') container:ElementRef;

  ngOnInit(): void {
  }


  createOption() {
    console.log(this.createOptionInput);
    this.container.nativeElement.insertAdjacentHTML(
      'beforeend', 
      `<div class="column is-one-quarter"><div class="card"><header class="card-header"><p class="card-header-title is-centered has-text-weight-normal"><input value=${this.createOptionInput} /></p></header><footer class="card-footer has-background-danger"><a class="card-footer-item has-text-white" (click)="removeOption($event.target)">Remove</a></footer></div></div>`
      )
  }

  removeOption(target) {
    console.log(target);
  }

}
