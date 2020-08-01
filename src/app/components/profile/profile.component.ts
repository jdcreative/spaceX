import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealtimeDatabaseService } from 'src/app/service/realtime-database.service';
import { UtilsService } from 'src/app/service/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public tribus = [];
  public conferencistas = [];
  public live_video;
  tab: string = 'home';
  finalColor: any;
  userProfile: any;
  colorUser: any;
  data: any = [{
    halcones: "linear-gradient(180deg, rgba(255, 27, 27, 0) 33.68%, #7839FF 110.36%), #ED5059",
    tiburones: "linear-gradient(180deg, rgba(27, 228, 255, 0) 23.74%, #3965FF 97.77%), #71D7CA",
    gorilas: "linear-gradient(180deg, rgba(13, 201, 165, 0) 45.6%, #19B960 106.71%), #C1F092",
    leones: "linear-gradient(180deg, rgba(237, 44, 44, 0) 13.22%, #F95252 94.29%), #FFF09B"
  }];

  constructor(
    private router: Router,
    private _database: RealtimeDatabaseService,
    private _utils: UtilsService,
    private _translate: TranslateService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("user"));
    this.userProfile = data["user"];
    this.validationColors();
    this.getTribus();
    this.getConferencista();
    this.videoLive();
  }

  videoLive(){
    this._translate.setDefaultLang(localStorage.getItem('lang'));
    this._translate.get("profile.live").subscribe((res)=>{
      console.log(res)
      this.live_video = this.sanitizer.bypassSecurityTrustResourceUrl(res);
      console.log(this.live_video)
      
    });
  }

  getTribus() {
    this._database.getTribus().snapshotChanges().subscribe((res) => {
      this.tribus = [];
      res.forEach((tribus: any) => {
        let id = tribus.payload.toJSON();
        this.tribus.push(id);
      });
    });
  }

  getConferencista() {
    this._database.getActualConferencista().snapshotChanges().subscribe((res) => {
      this.conferencistas = [];
      res.forEach((tribus: any) => {
        let id = tribus.payload.toJSON();
        this.conferencistas.push(id);
      });
    });

  }

  setLanguage(lang){
    this._utils.setLang(lang);
    this.videoLive()
  }

  sendTagReceive(event) {
    this.tab = event;
  }

  validationColors() {
    if (this.userProfile.tribu == "1") {
      this.finalColor = this.data[0].gorilas;
    } else if (this.userProfile.tribu == "2") {
      this.finalColor = this.data[0].halcones;
    } else if (this.userProfile.tribu == "3") {
      this.finalColor = this.data[0].leones;
    } else if (this.userProfile.tribu == "4") {
      this.finalColor = this.data[0].tiburones;
    } else {
      this.finalColor = this.data[0].leones;
    }

  }

}
