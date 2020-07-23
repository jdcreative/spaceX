import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import {  } from '@angular/http'
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
import { FirestoreService } from './service/firestore.service';
import { ValidateUserComponent } from './modals/validate-user/validate-user.component';
import { LoginComponent } from './modals/login/login.component';
import { PreconvencionComponent } from './components/preconvencion/preconvencion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    SignUpComponent,
    ValidateUserComponent,
    LoginComponent,
    PreconvencionComponent
  ],
  imports: [
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
  ],
  providers: [
    AngularFirestore,    
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SignUpComponent,
    ValidateUserComponent,
    LoginComponent
  ]
})
export class AppModule { }
