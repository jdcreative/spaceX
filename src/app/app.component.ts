import { Component, OnInit, HostListener } from '@angular/core';
import { combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './service/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'space';
  public navigatorLang: string;
  isShow: boolean;
  topPosToStartShowing = 100;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private utils: UtilsService
  ) { }

  @HostListener('window:scroll') checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

  }

  ngOnInit() {
    this.setLanguage();
  }

  setLanguage() {

    const getGlobalLang = this.http.get('assets/i18n/_i18n.json');
    const getDefaultLang = this.http.get('assets/i18n/es.json');

    if (localStorage.getItem("lang") == undefined || localStorage.getItem("lang") == null) {
      this.navigatorLang = navigator.language.split("-")[0];
    } else {
      this.navigatorLang = localStorage.getItem("lang");
    }

    const combined = combineLatest(getGlobalLang, getDefaultLang);
    const subscribe = combined.subscribe(res => {
      this.translate.setTranslation('_i18n', Object.assign({}, res[0], res[1]));
      this.translate.addLangs(['_i18n', ...Object.keys(res[0])]);
      this.translate.setDefaultLang('_i18n');
      !this.navigatorLang ? this.utils.setLang('es') : this.utils.setLang(this.navigatorLang);
    });

  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
