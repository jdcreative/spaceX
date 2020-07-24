import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  tab: string = 'home';
  finalColor: any;
  colors: any = [{
    halcones: "linear-gradient(90deg, rgba(237, 44, 44, 0) 13.22%, #F95252 94.29%), #FFF09B",
    tiburones: "linear-gradient(90deg, rgba(27, 228, 255, 0) 23.74%, #3965FF 97.77%), #71D7CA",
    gorilas: "linear-gradient(90deg, rgba(13, 201, 165, 0) 45.6%, #19B960 106.71%), #C1F092",
    other: "linear-gradient(90deg, rgba(255, 27, 27, 0) 33.68%, #7839FF 110.36%), #ED5059"
  }];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.validationColors();
  }

  sendTagReceive(event) {
    this.tab = event;
  }

  validationColors() {
    this.finalColor = this.colors[0].tiburones;
  }

  closeSession() {
    localStorage.clear();
    this.router.navigate(["/home"]);
  }

}
