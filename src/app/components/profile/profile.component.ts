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
  userProfile: any;
  data: any = [{
    halcones: "linear-gradient(180deg, rgba(255, 27, 27, 0) 33.68%, #7839FF 110.36%), #ED5059",
    tiburones: "linear-gradient(180deg, rgba(27, 228, 255, 0) 23.74%, #3965FF 97.77%), #71D7CA",
    gorilas: "linear-gradient(180deg, rgba(13, 201, 165, 0) 45.6%, #19B960 106.71%), #C1F092",
    leones: "linear-gradient(180deg, rgba(237, 44, 44, 0) 13.22%, #F95252 94.29%), #FFF09B"
  }];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("user"));
    this.validationColors();
  }

  sendTagReceive(event) {
    this.tab = event;
  }


  validationColors() {
    if (this.userProfile.tribu == "1" || this.userProfile.tribu == 1) {
      this.finalColor = this.data[0].gorilas;
    } else if (this.userProfile.tribu == "2" || this.userProfile.tribu == 2) {
      this.finalColor = this.data[0].halcones;
    } else if (this.userProfile.tribu == "3" || this.userProfile.tribu == 3) {
      this.finalColor = this.data[0].leones;
    } else if (this.userProfile.tribu == "4" || this.userProfile.tribu == 4) {
      this.finalColor = this.data[0].tiburones;

    } else {
      this.finalColor = this.data[0].leones;
    }

  }
  closeSession() {
    localStorage.clear();
    this.router.navigate(["/home"]);
  }

}
