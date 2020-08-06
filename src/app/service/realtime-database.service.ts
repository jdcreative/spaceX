import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class RealtimeDatabaseService {

  tribus: AngularFireList<any>;
  buttons: AngularFireList<any>;
  taller: AngularFireList<any>;
  livelang: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getTribus() {
    return this.tribus = this.firebase.list("tribus");
  }

  getButtons() {
    return this.buttons = this.firebase.list("buttons");
  }

  getLinkTalleres() {
    return this.taller = this.firebase.list("Talleres");
  }

  getLiveLang() {
    return this.livelang = this.firebase.list("live_home");
  }

}
