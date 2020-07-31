import { Component, OnInit } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  //array: string[] = ["One", "Two", "Three", "Four"];
  //key = [];
  constructor() {

  }

  ngOnInit() {
    /*
    this.translate.getTranslation(localStorage.getItem("lang"))
    this.translate.get("faq").subscribe((res) => {

      for (var number in res) {
        if (res.hasOwnProperty(number)) {
          this.key.push(number)
        }
      }
    }*/
  }
}