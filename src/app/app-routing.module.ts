import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PreconvencionComponent } from './components/preconvencion/preconvencion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FaqComponent } from './components/home/faq/faq.component';
import { SpeakersComponent } from './components/home/speakers/speakers.component';
import { WorkshopsComponent } from './components/home/workshops/workshops.component';
import { TribesComponent } from './components/home/tribes/tribes.component';
import { AuthGuard } from './guards/auth.guard';
import { SpecialGuestsComponent } from './components/home/special-guests/special-guests.component';
import { MusicComponent } from './components/home/music/music.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'preconvencion', component: PreconvencionComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'conferencistas', component: SpeakersComponent },
  { path: 'talleres', component: WorkshopsComponent },
  { path: 'tribus', component: TribesComponent },
  { path: 'invitados-especiales', component: SpecialGuestsComponent },
  { path: 'bandas', component: MusicComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
