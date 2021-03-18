import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  display = false;

  constructor() { }

  ngOnInit() {
  }

  public menuClicked() {
    // console.log("top bar menu clicked");
    this.display = !this.display;
  }
}
