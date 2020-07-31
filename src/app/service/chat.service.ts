import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'

import { chat } from '../interfaces/chat'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  
  messages: AngularFireList<any>;
  constructor(
    private fire: AngularFireDatabase,
  ) { }

  getMessages(){
    return this.fire.list('chatsomosuno').snapshotChanges()    
  }
  newMessage(message: chat) {
    this.messages = this.fire.list('/chatsomosuno');
    if (message) {
      console.log('lo que llega al servicio: ', message)
      this.messages.push({
        username: message.username,
        message: message.message,
        hourMessage: message.hourMessage
      });
    }

  }
  // getMessages(){
  //   return this.fire.collection<chat>('chats', ref => ref.orderBy('hourMessage','desc').limit(5)).valueChanges()    
  //   .pipe(map( (res:chat[])=>{
  //     this.messages = [];
  //     for(let message of res){
  //       this.messages.unshift(message)
  //       console.log(this.messages);
  //     }
  //   }))
  // }
  // newMessage(message: chat){
  //   return this.fire.collection('chats').add(message)
  // }
}
