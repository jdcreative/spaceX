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
  finalImage: any = "http://cdn.somosunogo.com/default-user.jpg";
  finalTribu: string;
  data: any = [{
    halcones: "linear-gradient(rgba(255, 27, 27, 0) 15.68%, #1BE4FF 110.36%), #3965FF",
    tiburones: "linear-gradient(rgba(255, 27, 27, 0) 15.68%, #1BE4FF 110.36%), #3965FF",
    gorilas: "linear-gradient(rgba(255, 27, 27, 0) 15.68%, #1BE4FF 110.36%), #3965FF",
    leones: "linear-gradient(rgba(255, 27, 27, 0) 15.68%, #1BE4FF 110.36%), #3965FF"
  }, {
    halcones: "https://cdn.somosunogo.com/halcones.jpeg",
    tiburones: "https://cdn.somosunogo.com/tiburones.jpeg",
    gorilas: "https://cdn.somosunogo.com/gorilas.jpeg",
    leones: "https://cdn.somosunogo.com/leones.jpeg"
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
    let data = JSON.parse(localStorage.getItem("user"));
    this.userProfile = data["user"];
  }

  ngOnChanges() {
    if (this.tribus.length >= 1) {
      this.validateTribus();
    }
  }

  validateTribus() {

    if (this.userProfile.tribu == "1") {
      this.tribuPoints = this.tribus[0].value;
    } else if (this.userProfile.tribu == "2") {
      this.tribuPoints = this.tribus[1].value;
    } else if (this.userProfile.tribu == "3") {
      this.tribuPoints = this.tribus[2].value;
    } else if (this.userProfile.tribu == "4") {
      this.tribuPoints = this.tribus[3].value;
    } else {
      this.tribuPoints = this.tribus[2].value;
    }
  }

  validationColors() {

    if (this.userProfile.tribu == "1") {
      this.finalColor = this.data[0].gorilas;
      this.finalImage = this.data[1].gorilas;
      this.finalTribu = this.data[2].gorilas;
    } else if (this.userProfile.tribu == "2") {
      this.finalColor = this.data[0].halcones;
      this.finalImage = this.data[1].halcones;
      this.finalTribu = this.data[2].halcones;
    } else if (this.userProfile.tribu == "3") {
      this.finalColor = this.data[0].leones;
      this.finalImage = this.data[1].leones;
      this.finalTribu = this.data[2].leones;
    } else if (this.userProfile.tribu == "4") {
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
    localStorage.removeItem("user");
    this._router.navigate(["/home"]);
  }

}
