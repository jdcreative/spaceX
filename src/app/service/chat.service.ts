import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { chat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  messages: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getMessages() {
    return this.firebase.list('chatsomosuno', ref => ref.limitToLast(50));
  }

  newMessage(message: chat) {

    this.messages = this.firebase.list('chatsomosuno', ref => ref.limitToLast(50));

    return this.messages.push({
      username: message.username,
      message: message.message,
      hourMessage: message.hourMessage,
      tribu: message.tribu
    });

  }

  deleteMessage(event) {
    this.messages = this.firebase.list('chatsomosuno', ref => ref.limitToLast(50));
    return this.messages.remove(event.$key);
  }

}
