import { Injectable } from '@angular/core';
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
    return this.fire.list('chatsomosuno', ref => ref.limitToLast(6) ).snapshotChanges()  
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
}
