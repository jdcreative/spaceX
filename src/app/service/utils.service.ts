import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(
    public translate: TranslateService
  ) { }

  getCurrentLang(): string {
    return localStorage.getItem('lang');
  }

  setLang(language: string): void {
    if (language) {
      this.translate.use(language);
      localStorage.setItem("lang", language);
    }
  }

}
