import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { chat } from '../interfaces/chat'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

 public messages: chat[]=[];
  constructor(
    private fire: AngularFirestore,
  ) { }
    
  getMessages(){
    return this.fire.collection<chat>('chats', ref => ref.orderBy('hourMessage','desc').limit(5)).valueChanges()    
    .pipe(map( (res:chat[])=>{
      this.messages = [];
      for(let message of res){
        this.messages.unshift(message)
        console.log(this.messages);
      }
    }))
  }
  newMessage(message: chat){
    return this.fire.collection('chats').add(message)
  }
}
