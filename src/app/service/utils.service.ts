import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { countryInterface } from '../interfaces/country_interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 
  urlApi = 'https://gateway.mcidonaciones.com:1100/Master';
  httpOptions = {
    headers: new HttpHeaders({'ContentType': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  getCountries(){
    let akjsd = this.http.get<countryInterface>(this.urlApi +'/GetCountryXDepartamentXCity', this.httpOptions)
    console.log(akjsd);
    return akjsd
  }

  
}
