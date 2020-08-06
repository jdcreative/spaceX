import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class RealtimeDatabaseService {

  tribus: AngularFireList<any>;
  conferencista: AngularFireList<any>;
  taller: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getTribus() {
    return this.tribus = this.firebase.list("tribus");
  }

  getActualConferencista() {
    return this.conferencista = this.firebase.list("conferencistas");
  }
  getLinkTalleres(){
    return this.taller = this.firebase.list("Talleres");
  }
  newTallers(taller:any){
    console.log('lo que llega al servicio: ', taller);
    const talleresNuevos = this.firebase.list("Talleres");
    return talleresNuevos.push({
      nombre:taller.nombre,
      idioma:taller.idioma,
      tipo:taller.tipo,
      link:taller.link
    })
  }
}
