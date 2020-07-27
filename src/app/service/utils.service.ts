import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { countryInterface } from '../interfaces/country_interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  private urlApi = 'api/countries';
  httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/json' })
  };

  constructor(private http: HttpClient, public translate: TranslateService) { }

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
