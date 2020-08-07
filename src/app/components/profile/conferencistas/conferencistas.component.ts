import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-conferencistas',
  templateUrl: './conferencistas.component.html',
  styleUrls: ['./conferencistas.component.css']
})
export class ConferencistasComponent implements OnInit {
  @Input() idioma: any;
  public live_video;
  tabTools: string = 'bloque_01';
  constructor(
    private _translate: TranslateService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.setVideo('bloque_01')
  }

  ngOnChanges(){
    console.log('algo cambio')
    console.log(this.idioma)
    console.log(this.tabTools)
    this.setVideo(this.tabTools)
  }

  setVideo(bloque?){

    let lang = localStorage.getItem('lang')
    let bloque_string = bloque.toString();
    let lang_string = lang.toString();
    let video = bloque_string+"."+lang_string;

    this._translate.setDefaultLang(lang);
    this._translate.get(video).subscribe((res) => {
    this.live_video = this.sanitizer.bypassSecurityTrustResourceUrl(res); 
    
    });
  }

  changeTabTool(event) {
    this.tabTools = event;
    this.setVideo(event);
  }
  
}
