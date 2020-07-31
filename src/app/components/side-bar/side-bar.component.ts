import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {

  @Output() sendTag: EventEmitter<string> = new EventEmitter<string>();

  @Input() tribus: any;

  userProfile: any;
  tab: string = "home";
  finalColor: any;
  finalImage: any = "assets/media/default-user.jpg";
  finalTribu: string;
  data: any = [{
    halcones: "linear-gradient(180deg, rgba(255, 27, 27, 0) 33.68%, #7839FF 110.36%), #ED5059",
    tiburones: "linear-gradient(180deg, rgba(27, 228, 255, 0) 23.74%, #3965FF 97.77%), #71D7CA",
    gorilas: "linear-gradient(180deg, rgba(13, 201, 165, 0) 45.6%, #19B960 106.71%), #C1F092",
    leones: "linear-gradient(180deg, rgba(237, 44, 44, 0) 13.22%, #F95252 94.29%), #FFF09B"
  }, {
    halcones: "assets/profiles/halcones.jpeg",
    tiburones: "assets/profiles/tiburones.jpeg",
    gorilas: "assets/profiles/gorilas.jpeg",
    leones: "assets/profiles/leones.jpeg"
  }, {
    halcones: "Halcones",
    tiburones: "Tiburones",
    gorilas: "Gorilas",
    leones: "Leones"
  }];

  tribuPoints: string = "0";

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.validationColors();
  }

  getUser() {
    this.userProfile = JSON.parse(localStorage.getItem("user"));
  }

  ngOnChanges() {
    if (this.tribus.length >= 1) {
      this.validateTribus();
    }

  }

  validateTribus() {

    if (this.userProfile.tribu == "1" || this.userProfile.tribu == 1) {
      this.tribuPoints = this.tribus[0].value;
    } else if (this.userProfile.tribu == "2" || this.userProfile.tribu == 2) {
      this.tribuPoints = this.tribus[1].value;
    } else if (this.userProfile.tribu == "3" || this.userProfile.tribu == 3) {
      this.tribuPoints = this.tribus[2].value;
    } else if (this.userProfile.tribu == "4" || this.userProfile.tribu == 4) {
      this.tribuPoints = this.tribus[3].value;
    } else {
      this.tribuPoints = this.tribus[2].value;
    }
  }

  validationColors() {

    if (this.userProfile.tribu == "1" || this.userProfile.tribu == 1) {
      this.finalColor = this.data[0].gorilas;
      this.finalImage = this.data[1].gorilas;
      this.finalTribu = this.data[2].gorilas;
    } else if (this.userProfile.tribu == "2" || this.userProfile.tribu == 2) {
      this.finalColor = this.data[0].halcones;
      this.finalImage = this.data[1].halcones;
      this.finalTribu = this.data[2].halcones;
    } else if (this.userProfile.tribu == "3" || this.userProfile.tribu == 3) {
      this.finalColor = this.data[0].leones;
      this.finalImage = this.data[1].leones;
      this.finalTribu = this.data[2].leones;
    } else if (this.userProfile.tribu == "4" || this.userProfile.tribu == 4) {
      this.finalColor = this.data[0].tiburones;
      this.finalImage = this.data[1].tiburones;
      this.finalTribu = this.data[2].tiburones;
    } else {
      this.finalColor = this.data[0].leones;
      this.finalImage = this.data[1].leones;
      this.finalTribu = this.data[2].leones;
    }

  }

  goTo(event: string) {
    this.tab = event;
    this.sendTag.emit(this.tab);
  }

  closeSession() {
    localStorage.clear();
    this._router.navigate(["/home"]);
  }

}
