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

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userProfile = JSON.parse(localStorage.getItem("user"));
    console.log("PROFILE USER: ", this.userProfile);
  }

  goTo(event: string) {
    this.tab = event;
    this.sendTag.emit(this.tab);
  }

  closeSession(){
    localStorage.clear();
    this._router.navigate(["/homr"]);
  }

}
