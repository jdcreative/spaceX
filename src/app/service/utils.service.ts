import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { countryInterface } from '../interfaces/country_interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 
  private urlApi = 'api/countries';
  httpOptions = {
    headers: new HttpHeaders({'ContentType': 'application/json'})
  };
  constructor(private http: HttpClient) { }

}
