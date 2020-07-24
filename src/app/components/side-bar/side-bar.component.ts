import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {

  @Output() sendTag: EventEmitter<string> = new EventEmitter<string>();
  userProfile: any;
  tab: string = "home";
  finalColor: any;
  colors: any = [{
    halcones: "linear-gradient(180deg, rgba(237, 44, 44, 0) 13.22%, #F95252 94.29%), #FFF09B",
    tiburones: "linear-gradient(180deg, rgba(27, 228, 255, 0) 23.74%, #3965FF 97.77%), #71D7CA",
    gorilas: "linear-gradient(180deg, rgba(13, 201, 165, 0) 45.6%, #19B960 106.71%), #C1F092",
    other: "linear-gradient(180deg, rgba(255, 27, 27, 0) 33.68%, #7839FF 110.36%), #ED5059"
  }];

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    console.log(this.colors);
    this.getUser();
    this.validationColors();
  }

  getUser() {
    this.userProfile = JSON.parse(localStorage.getItem("user"));
    console.log("PROFILE USER: ", this.userProfile);
  }

  validationColors() {
    this.finalColor = this.colors[0].tiburones;
  }

  goTo(event: string) {
    this.tab = event;
    this.sendTag.emit(this.tab);
  }

  closeSession() {
    localStorage.clear();
    this._router.navigate(["/homr"]);
  }

}
