import { catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { user} from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  apiUrl: string='https://s4wefa15bh.execute-api.us-east-2.amazonaws.com/lab/user';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private http: HttpClient
  ) { }

  getDataUser(mail:string): Observable<any>{      
    return this.http.post<user>(this.apiUrl,{email:mail})
    .pipe(catchError(this.handleError));    
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      throw error.error.message;
    } else {
        console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`);       
    }

    return throwError(
      'Something bad happened; please try again later.');
  }  
}
