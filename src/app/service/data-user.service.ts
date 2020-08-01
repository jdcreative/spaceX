import { userInterface } from './../interfaces/user_interface';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})

export class DataUserService {

  apiUrl = 'https://tnpuu5xzq6.execute-api.us-east-2.amazonaws.com/dev/auth';
  apiCode = 'https://4sgi96tm5h.execute-api.us-east-2.amazonaws.com/dev/send_code';
  apiValidateCode = 'https://tqufnitxp8.execute-api.us-east-2.amazonaws.com/dev/validate_code';
  apiUpdate = 'https://ybvvk76o5k.execute-api.us-east-2.amazonaws.com/dev/update_user';
  apiNew = 'https://tm44g2qq8k.execute-api.us-east-2.amazonaws.com/dev/signup';
  apiAuth = 'https://virr342x09.execute-api.us-east-2.amazonaws.com/dev/authorization';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getDataUser(mail: string): Observable<any> {
    return this.http.post<userInterface>(this.apiUrl, { email: mail }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCodeSesion(mail: string): Observable<any> {
    // console.log('el mail enviado', mail)
    let emailLower = mail.toLowerCase();
    return this.http.post<user>(this.apiCode, { email: emailLower }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  validateCode(mail: string, code: number): Observable<any> {
    // console.log('mail :', mail, ' code: ', code);
    return this.http.post<any>(this.apiValidateCode, { email: mail, code: code }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateDataUser(datauser: any): Observable<any> {
    // console.log('la data que llega: ',datauser);
    return this.http.post<userInterface>(this.apiUpdate, datauser, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createUser(data: any): Observable<any> {
    // console.log('la data del new user: ', data);
    return this.http.post<userInterface>(this.apiNew, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAuthToken(email: string, code: any): Observable<any> {
    let emailLower = email.toLowerCase();
    return this.http.post<userInterface>(this.apiAuth, { email: emailLower, code: code }, this.httpOptions).pipe(
      catchError(this.handleError));
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
