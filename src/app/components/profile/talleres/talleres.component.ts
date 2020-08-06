import { Component, OnInit, Input } from '@angular/core';
import { RealtimeDatabaseService } from '../../../service/realtime-database.service';
import { database } from 'firebase';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})

export class TalleresComponent implements OnInit {

  @Input() idioma:any;  
  tab: string;
  public listTalleres: any[];
  link: any;

  constructor(private realtimeservice: RealtimeDatabaseService) { }

  ngOnInit() {
    this.changeTab('taller1');
    this.getTalleres();        
  }

  ngOnChanges() {
    if (this.idioma) {      
         this.changeTab(this.tab)
    }       
  }
  getTalleres() {    
    this.realtimeservice.getLinkTalleres().snapshotChanges().subscribe(res => {
      this.listTalleres = [];

      res.forEach(data => {
        let taller = data.payload.toJSON();
        this.listTalleres.push(taller);
        taller['$key'] = data.key;
      })      
    })    
  }

  changeTab(tab: string) {
    this.tab = tab;
    setTimeout(() => {
      this.redirectTaller(tab);
    }, 1000);    
  }

  redirectTaller(tab:string ) {  
       const e = localStorage.getItem('lang');       
    if(tab == 'taller1'){
      if (e == 'pt'){
        this.link = this.listTalleres[1].link;        
      } else{
        this.link = this.listTalleres[0].link;        
      }
    }else if(tab == 'taller2'){
      if(e == 'pt' ){         
         this.link = this.listTalleres[3].link;         
      }else{
        this.link = this.listTalleres[2].link;        
      }
    }else if(tab == 'taller3'){
      if(e == 'pt' ){
        this.link = this.listTalleres[5].link;         
      }else{
        this.link = this.listTalleres[4].link;        
      }
    }else if(tab == 'taller4'){
      if(e == 'pt' ){
        this.link = this.listTalleres[7].link;         
      }else{
        this.link = this.listTalleres[6].link;        
      }
    }else if(tab == 'taller5'){
      if(e == 'pt' ){
        this.link = this.listTalleres[9].link;         
      }else{
        this.link = this.listTalleres[8].link;        
      }
    }else if(tab == 'taller6'){
      if(e == 'pt' ){
        this.link = this.listTalleres[11].link;         
      }else{
        this.link = this.listTalleres[10].link;        
      }
    }
    
  }
}
