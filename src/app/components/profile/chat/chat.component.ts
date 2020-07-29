import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Component, OnInit } from '@angular/core';


import { ChatService } from 'src/app/service/chat.service';
import { chat } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  
  messages:chat[];
  ordermessage:any;
  formMessages:FormGroup;
  userProfile:any;
  username:any
  constructor(
    private fb : FormBuilder,
    public chatservice: ChatService,
  ) { 
    this.buildForm();
  }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("user"));
    console.log(this.userProfile)
    this.username = this.userProfile.nombre +' '+ this.userProfile.apellidos;
    this.getchat();
    this.setvalues();
  }
  
  getchat(){
    this.chatservice.getMessages().subscribe()
  }
  buildForm(){
    this.formMessages = this.fb.group({
      username:[''],
      message:['', Validators.required],
      hourMessage:[new Date().getTime()]
    });
    this.formMessages.valueChanges.subscribe(res=>{
      // console.log('new message: ',res);
    })
  }
  newMessage(e:Event){
    e.preventDefault();
    console.log(this.formMessages.value)
    if(this.formMessages.valid){
      let data = this.formMessages.value;      
      console.log('data del mensaje: ', data);
      this.chatservice.newMessage(data)
      .then(()=>{this.setvalues()})
      .catch((err)=>{console.error('error al enviar: ', err)})  
      this.formMessages.reset;
    }
    
  }
  setvalues(){ 
    let tiempo = new Date().getTime();  
    this.formMessages.controls['username'].setValue(this.username);
    this.formMessages.controls['hourMessage'].setValue(tiempo);    
    // this.formMessages.controls['message'].setValue(''); 
  }

}
