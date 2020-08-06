import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealtimeDatabaseService } from 'src/app/service/realtime-database.service';
import { UtilsService } from 'src/app/service/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public tribus = [];
  public conferencistas = [];
  public liveArray = [];
  public live_video;

  idioma: any;
  tab: string = 'home';
  tabTools: string = 'notas';
  finalColor: any;
  userProfile: any;
  colorUser: any;
  data: any = [{
    halcones: "linear-gradient(180deg, rgba(255, 27, 27, 0) 33.68%, #7839FF 110.36%), #ED5059",
    tiburones: "linear-gradient(180deg, rgba(27, 228, 255, 0) 23.74%, #3965FF 97.77%), #71D7CA",
    gorilas: "linear-gradient(180deg, rgba(13, 201, 165, 0) 45.6%, #19B960 106.71%), #C1F092",
    leones: "linear-gradient(180deg, rgba(237, 44, 44, 0) 13.22%, #F95252 94.29%), #FFF09B"
  }];
  loadingVideo: boolean = false;

  constructor(
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
    this.getLiveLanguage();
    
  }

  getLiveLanguage() {
    this.loadingVideo = true;
    this._database.getLiveLang().snapshotChanges().subscribe((res) => {
      this.liveArray = [];
      res.forEach((tribus: any) => {
        let id = tribus.payload.toJSON();
        this.liveArray.push(id);
      });
      this.videoLive();
    });
  }

  videoLive() {

    this.loadingVideo = false;
    let saveVideo;
    let lang = localStorage.getItem("lang");

    if (lang == "en") {
      saveVideo = this.liveArray[0].link;
    } else if (lang == "fr") {
      saveVideo = this.liveArray[1].link;
    } else if (lang == "pt") {
      saveVideo = this.liveArray[2].link;
    } else if (lang == "ru") {
      saveVideo = this.liveArray[3].link;
    } else if (lang == "es") {
      saveVideo = this.liveArray[4].link;
    }
    this.live_video = this.sanitizer.bypassSecurityTrustResourceUrl(saveVideo);

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

  setLanguage(lang) {
    this.idioma = lang;
    this._utils.setLang(lang);
    this.videoLive()
  }

  sendTagReceive(event) {
    this.tab = event;
  }

  changeTabTool(event) {
    this.tabTools = event;
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
