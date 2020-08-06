import { Component, OnInit, Input } from '@angular/core';
import { RealtimeDatabaseService } from '../../../service/realtime-database.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})

export class TalleresComponent implements OnInit {

  @Input() idioma: any;
  public listTalleres: any[];
  public buttonsStatus: any[];
  link: any;
  tab: string;
  ubicado:any;

  constructor(private realtimeservice: RealtimeDatabaseService) { }

  ngOnInit() {
    this.changeTab('taller1');
    this.getTalleres();
    this.getButtonsValidation();
  }

  ngOnChanges() {
    if (this.idioma) {
      this.changeTab(this.tab);
    }
  }

  getButtonsValidation() {
    this.realtimeservice.getButtons().snapshotChanges().subscribe((res) => {
      this.buttonsStatus = [];
      res.forEach(data => {
        let id = data.payload.toJSON();
        this.buttonsStatus.push(id);
      });
    });
  }

  getTalleres() {

    this.realtimeservice.getLinkTalleres().snapshotChanges().subscribe(res => {

      this.listTalleres = [];
      res.forEach(data => {
        let taller = data.payload.toJSON();
        this.listTalleres.push(taller);
        taller['$key'] = data.key;
      });
    });

  }

  changeTab(tab: string) {

    this.tab = tab;
    setTimeout(() => {
      this.redirectTaller(tab);
    }, 1000);

  }

  redirectTaller(tab: string) {

    const e = localStorage.getItem('lang');

    if (tab == 'taller1') {
      if (e == 'pt') {
        this.link = this.listTalleres[1].link;
        this.ubicado = this.listTalleres[1].idioma;
      } else {
        this.link = this.listTalleres[0].link;
        this.ubicado = this.listTalleres[0].idioma;
      }
    } else if (tab == 'taller2') {
      if (e == 'pt') {
        this.link = this.listTalleres[3].link;
        this.ubicado = this.listTalleres[3].idioma;
      } else {
        this.link = this.listTalleres[2].link;
        this.ubicado = this.listTalleres[2].idioma;
      }
    } else if (tab == 'taller3') {
      if (e == 'pt') {
        this.link = this.listTalleres[5].link;
        this.ubicado = this.listTalleres[5].idioma;
      } else {
        this.link = this.listTalleres[4].link;
        this.ubicado = this.listTalleres[4].idioma;
      }
    }else if(tab == 'taller4'){
      if(e == 'pt' ){
        this.link = this.listTalleres[7].link;         
        this.ubicado = this.listTalleres[7].idioma;
      }else if(e == 'en'){        
        this.link = this.listTalleres[8].link;  
        this.ubicado = this.listTalleres[8].idioma;
      }
      else if(e == 'ru'){        
        this.link = this.listTalleres[9].link;  
        this.ubicado = this.listTalleres[9].idioma;
      }else if(e == 'fr'){        
        this.link = this.listTalleres[10].link;  
        this.ubicado = this.listTalleres[10].idioma;
      }
      else{
        this.link = this.listTalleres[6].link;        
        this.ubicado = this.listTalleres[6].idioma;
      }
    }else if(tab == 'taller5'){
      if(e == 'pt' ){
        this.link = this.listTalleres[12].link;         
        this.ubicado = this.listTalleres[12].idioma;
      }else if(e == 'en'){        
        this.link = this.listTalleres[13].link; 
        this.ubicado = this.listTalleres[13].idioma;
      }
      else if(e == 'fr'){        
        this.link = this.listTalleres[14].link; 
        this.ubicado = this.listTalleres[14].idioma;
      }
      else if(e == 'ru'){        
        this.link = this.listTalleres[15].link; 
        this.ubicado = this.listTalleres[15].idioma;
      }
      else{
        this.link = this.listTalleres[11].link;        
        this.ubicado = this.listTalleres[11].idioma;
      }
    }else if(tab == 'taller6'){
      if(e == 'pt' ){
        this.link = this.listTalleres[17].link;         
        this.ubicado = this.listTalleres[17].idioma;
      }else{
        this.link = this.listTalleres[16].link;        
        this.ubicado = this.listTalleres[16].idioma;
      }
    }    
  }
}
