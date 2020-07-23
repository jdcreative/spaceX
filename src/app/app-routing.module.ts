import { PreconvencionComponent } from './components/preconvencion/preconvencion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'preconvencion', component:PreconvencionComponent},
  {path: '**', component: PreconvencionComponent},
  {path: '', redirectTo: 'preconvencion', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
