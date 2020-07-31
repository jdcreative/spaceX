import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone'


import { ChatService } from 'src/app/service/chat.service';
import { chat } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() finalColor:any;
  finalImage:any;
  chats: chat[];
  chatSix: chat[];
  ordermessage:any;
  formMessages:FormGroup;
  userProfile:any;
  username:any;
  imgProfileTribu={
    halcones: "assets/profiles/halcones.jpeg",
    tiburones: "assets/profiles/tiburones.jpeg",
    gorilas: "assets/profiles/gorilas.jpeg",
    leones: "assets/profiles/leones.jpeg"
  }
  
  constructor(
    private fb : FormBuilder,
    public chatservice: ChatService,
  ) { 
    this.buildForm();
  }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("user"));    
    this.username = this.userProfile.nombre +' '+ this.userProfile.apellidos;
    this.getchat();
    this.chatservice.getMessages();
    this.setvalues();
    this.selectImgTribu();    
  }
  
  getchat(){
    this.chatservice.getMessages()
    .subscribe(res=>{
      this.chats = [];   
      const arrayFire = res  ;
      res.forEach(data=>{
        let chat = data.payload.toJSON();  
        this.chats.push(chat as chat)                                              
        chat['$key'] = data.key;        
        console.log('chats : ', this.chats);
      }) 
    })
  }
  buildForm(){
    this.formMessages = this.fb.group({
      username:[''],
      message:['', Validators.required],
      hourMessage:[new Date().getTime()]
    });
    this.formMessages.valueChanges.subscribe(res=>{ 
      // console.log('el form',res)     
    })
  }
  newMessage(e:Event){
    e.preventDefault();
    console.log(this.formMessages.value)
    if(this.formMessages.valid){
      let data = this.formMessages.value;      
      console.log('data del mensaje: ', data);
      this.chatservice.newMessage(data);
      this.formMessages.reset();
      this.setvalues()
            
    }    
  }
  setvalues(){     
    let timeHere = moment.tz('America/Bogota').format();
    this.formMessages.controls['username'].setValue(this.username);
    this.formMessages.controls['hourMessage'].setValue(timeHere);    
    this.formMessages.controls['message'].setValue(' '); 
  }
  
  styleCloud(e:string){
    let user;
    if(this.username == e){
      user= true;
    }else{user=false}    
    let style = {
      'background': user ? '#4f4f4f99' : '#6f6f6f4d'
    }
    return style
  }


  selectImgTribu() {
    if (this.userProfile.tribu == "1" || this.userProfile.tribu == 1) {      
      this.finalImage = this.imgProfileTribu.gorilas;      
    } else if (this.userProfile.tribu == "2" || this.userProfile.tribu == 2) {      
      this.finalImage = this.imgProfileTribu.halcones;     
    } else if (this.userProfile.tribu == "3" || this.userProfile.tribu == 3) {      
      this.finalImage = this.imgProfileTribu.leones;      
    } else if (this.userProfile.tribu == "4" || this.userProfile.tribu == 4) {      
      this.finalImage = this.imgProfileTribu.tiburones;      
    } else {      
      this.finalImage = this.imgProfileTribu.leones;      
    }

  }

}
