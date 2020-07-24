import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  tab: string = 'home';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  sendTagReceive(event) {
    this.tab = event;
  }

  closeSession() {
    localStorage.clear();
    this.router.navigate(["/home"]);
  }

}
