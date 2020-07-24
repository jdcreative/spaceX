import { Injectable } from '@angular/core';
import 
{
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrordialogserviceService } from '../service/errordialogservice.service'; 

import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

/**
 * 
 */
@Injectable()
export class JwtService implements HttpInterceptor
{

    private auth0Client: Auth0Client;

    allowed_uris: any = ['update_user']

    //allowed_uris: any = []

    /**
     * 
     * @param errorDialogService 
     */
    constructor(public errorDialogService: ErrordialogserviceService) 
    {
        this.auth();
    }

    async auth0File()
    {
        var url = 'https://s3.us-east-2.amazonaws.com/com.somosunogo-website/auth0.json';

        fetch(url, {mode: 'no-cors'}).then(function(response) 
        {
            response.text().then(function(text) 
            {
                var obj = JSON.parse(text);
                for (var x in obj){
                    if (obj.hasOwnProperty(x))
                    {
                        this.allowed_uris.push(x["uri"])
                    }
                  }
            });
        });

    }

    /**
     * 
     */
    async auth()
    {
        this.auth0Client = await createAuth0Client
        (
            {
                domain: 'dev-e2onvwrq.us.auth0.com',
                client_id: 'dBk2f7JYLV18kXIECb1tZynjbztzpCZF'
            }
        );
    }

    /**
     * 
     * @param request 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        let token = localStorage.getItem('token');

        console.log(this.allowed_uris)

        const regex = /^https\:\/.+?\/dev\/(.+)/

        let uri = request.url.match(regex)[1];

        let array = this.allowed_uris.filter( value => value == uri);

        console.log(array);

        if(Array.isArray(array) && array.length > 0)
        {request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${ token }`) });}else{}
            
           
        if (!request.headers.has('Content-Type')) 
        {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        //request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => 
            {
                if (event instanceof HttpResponse) 
                {
                    console.log('Interceptor--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => 
            {
                console.log('error', error)
                let data = {};
                data = 
                {
                    reason: error && error.error && error.error.reason ? error.error.reason : error.statusText ? error.statusText : '',
                    status: error.status
                };

                this.errorDialogService.openDialog("ERRORHIJUEPUTA");
                return throwError(error);
            }));
    }


}
