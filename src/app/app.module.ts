
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { environment } from 'src/environments/environment';
import { MatDialogModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatOptionModule, MatInputModule, MatIconModule, MatButtonModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignUpComponent } from './modals/sign-up/sign-up.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

//Languages libraries
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//services
import { ChatService } from './service/chat.service';
import { ArraySortPipe } from './service/ordered.pipe';
import { SafePipe } from './service/safe.pipe';

//components
import { PreconvencionComponent } from './components/preconvencion/preconvencion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TribusComponent } from './components/profile/tribus/tribus.component';
import { ConferencistasComponent } from './components/profile/conferencistas/conferencistas.component';
import { TalleresComponent } from './components/profile/talleres/talleres.component';
import { MerchComponent } from './components/profile/merch/merch.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ChatComponent } from './components/profile/chat/chat.component';
import { EditorComponent } from './components/profile/editor/editor.component';

// Infinite Scroll
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//modals
import { ValidateUserComponent } from './modals/validate-user/validate-user.component';
import { LoginComponent } from './modals/login/login.component';
import { FaqComponent } from './components/home/faq/faq.component';
import { SpeakersComponent } from './components/home/speakers/speakers.component';
import { WorkshopsComponent } from './components/home/workshops/workshops.component';
import { TribesComponent } from './components/home/tribes/tribes.component';
import { SpecialGuestsComponent } from './components/home/special-guests/special-guests.component';
import { MusicComponent } from './components/home/music/music.component';
import { CodeComponent } from './components/home/code/code.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';







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
    ErrorDialogComponent,
    ChatComponent,
    FaqComponent,
    SpeakersComponent,
    WorkshopsComponent,
    TribesComponent,
    SpecialGuestsComponent,
    MusicComponent,
    CodeComponent,
    EditorComponent,
    ArraySortPipe,
    SafePipe,
    NavbarComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot(),
    NgxEmojiPickerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AngularFirestore,
    ChatService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SignUpComponent,
    ValidateUserComponent,
    LoginComponent,
    ErrorDialogComponent
  ]
})

export class AppModule {

  constructor(
    public translate: TranslateService
  ) { }

}
