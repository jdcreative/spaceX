import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { userInterface } from '../interfaces/user_interface';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  // selectedUser: userInterface = new userInterface();

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getTribus() {
    return this.firestore.collection("tribus").snapshotChanges();
  }

  // public getOneUser(email?: string) {

  //   if (email) {
  //     let user = this.db.collection('Usuarios', ref =>
  //       ref.where('email', '==', email))
  //     return user;
  //   } else { throw new Error('no such member') }
  // }

  // //obtener un usuario
  // public getUser($key: string) {
  //   return this.db.collection('Usuarios').doc($key).get();

  // }

  // //nuevo usuario
  // public newUser(user: userInterface) {
  //   return this.db.collection('Usuarios').add(user);
  // }

  // //actualizar datos
  // public updateUser($key: string, user: any) {
  //   return this.db.collection('Usuarios').doc($key).set(user);
  // }

  // //eliminar usuario (not use)
  // public deleteUser($key: string) {

  // }

}
