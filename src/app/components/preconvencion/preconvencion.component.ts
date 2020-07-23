import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preconvencion',
  templateUrl: './preconvencion.component.html',
  styleUrls: ['./preconvencion.component.css']
})
export class PreconvencionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  } 

  openHome() {
    this.router.navigate(['home']);
  }
}
