import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import {
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule
} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignUpComponent } from './modals/sign-up/sign-up.component';

//services
import { ValidateUserComponent } from './modals/validate-user/validate-user.component';
import { LoginComponent } from './modals/login/login.component';
import { PreconvencionComponent } from './components/preconvencion/preconvencion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TribusComponent } from './components/profile/tribus/tribus.component';
import { ConferencistasComponent } from './components/profile/conferencistas/conferencistas.component';
import { TalleresComponent } from './components/profile/talleres/talleres.component';
import { MerchComponent } from './components/profile/merch/merch.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    SignUpComponent,
    ValidateUserComponent,
    LoginComponent,
    PreconvencionComponent,
    ProfileComponent,
    SideBarComponent,
    TribusComponent,
    ConferencistasComponent,
    TalleresComponent,
    MerchComponent,
    ErrorDialogComponent
  ],
  imports:
    [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      MatDialogModule,
      MatRadioModule,
      MatOptionModule,
      MatSelectModule,
      MatCheckboxModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AppRoutingModule,
      //   JwtModule.forRoot  <----------ESTO CONTIENE ERRORES...
      //   ({                         Y ESTA AFECTANDO TODOS LOS SERVICIOS 
      //     config:                  EN ESPECIAL UPDATE USER --------
      //     {
      //         tokenGetter: 
      //         function  tokenGetter() 
      //         {
      //             return localStorage.getItem('access_token');
      //         },
      //         allowedDomains: ['localhost:3000']
      //     }
      //   })
    ],
  providers:
    [
      AngularFirestore,
      //   { 
      //       provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true 
      //   },
      //   ErrordialogserviceService,
    ],
  bootstrap: [AppComponent],
  entryComponents:
    [
      SignUpComponent,
      ValidateUserComponent,
      LoginComponent,
      ErrorDialogComponent
    ]

})
export class AppModule { }
