import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})

export class TalleresComponent implements OnInit {

  tab: string;

  constructor() { }

  ngOnInit() {
    this.changeTab('taller1');
  }

  changeTab(tab){
    this.tab = tab;
  }

}
