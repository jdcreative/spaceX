import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class RealtimeDatabaseService {

  tribus: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getTribus(){
    return this.tribus = this.firebase.list("tribus");
  }

}
