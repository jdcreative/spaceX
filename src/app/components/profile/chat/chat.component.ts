import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import * as moment from 'moment-timezone';
import { ChatService } from 'src/app/service/chat.service';
import { chat } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  @Input() finalColor: any;
  sendMessage: FormGroup;
  finalImage: any;
  userProfile: any;
  username: any;
  selector: string = '.main-panel';
  emojiSelected: string = "";
  color: string;
  toggled: boolean = false;
  blockButton: boolean = false;
  await: boolean = false;
  loader: boolean = true;
  localCount: number = 0;
  chats: any[];

  constructor(
    private fb: FormBuilder,
    public chatservice: ChatService,
    private scrollToService: ScrollToService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("user"));
    this.userProfile = data["user"];
    this.getChat();
    this.username = this.userProfile.nombre + ' ' + this.userProfile.apellidos;
  }

  buildForm() {
    this.sendMessage = this.fb.group({
      username: [''],
      tribu: [''],
      message: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      hourMessage: [new Date().getTime()]
    });
  }

  getChat() {

    this.chatservice.getMessages().snapshotChanges().subscribe(res => {

      this.chats = [];

      res.forEach(data => {
        let chat = data.payload.toJSON();
        this.chats.push(chat as chat)
        chat['$key'] = data.key;
      });
      this.loader = false;
    });

    this.triggerScrollTo();


  }

  // remove() {
  //   for (let i = 0; i < this.chats.length; i++) {
  //     this.chatservice.deleteMessage(this.chats[i]);

  //   }
  // }

  triggerScrollTo() {

    setTimeout(() => {
      const config: ScrollToConfigOptions = {
        target: 'destination'
      };
      this.scrollToService.scrollTo(config);
    }, 3000);

  }

  newMessage(e: Event) {

    e.preventDefault();
    this.localCount++;

    if (this.localCount == 2) {

      this.await = true;
      this.blockButton = true;

      setTimeout(() => {
        this.await = false;
        this.blockButton = false;
        this.localCount = 0;
      }, 15000);

    } else {

      this.blockButton = true;
      if (this.sendMessage.valid) {
        this.setvalues();
      }

    }
  }

  setvalues() {

    let actualTime = moment.tz('America/Bogota').format();
    this.sendMessage.controls['username'].setValue(this.username);
    this.sendMessage.controls["tribu"].setValue(this.userProfile["tribu"]);
    this.sendMessage.controls['hourMessage'].setValue(actualTime);
    this.sendMessage.controls['message'].setValue(this.sendMessage.value.message);


    let data = this.sendMessage.value;
    this.chatservice.newMessage(data);
    this.sendMessage.reset();
    this.emojiSelected = "";
    this.triggerScrollTo();

    setTimeout(() => {
      this.blockButton = false;
    }, 1000);

  }

  removeItem(event) {

    if (this.userProfile.email == 'fabian.zapata@gracialab.com.co' || this.userProfile.email == 'hectorj.24@hotmail.com' || this.userProfile.email == 'jdcreativemaker@gmail.com') {
      this.chatservice.deleteMessage(event);
    }

  }

  styleCloud(e: string) {
    let user;
    if (this.username == e) {
      user = true;
    } else { user = false }
    let style = {
      'background': user ? '#4f4f4f99' : '#6f6f6f4d'
    }
    return style
  }

  handleSelection(event) {
    this.emojiSelected += event.char;
  }

}
