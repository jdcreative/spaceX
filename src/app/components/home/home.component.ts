import { LoginComponent } from './../../modals/login/login.component';
import { SignUpComponent } from './../../modals/sign-up/sign-up.component';
import { ValidateUserComponent } from './../../modals/validate-user/validate-user.component'
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UtilsService } from "../../service/utils.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  languaje: any;
  isOpenClose: boolean = false;
  constructor(
    private dialog: MatDialog,
    private UtilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.validateSession();
  }

  validateSession() {
    let user = localStorage.getItem("user");
    if (user) {
      this.router.navigate(["/profile"]);
    }
  }

  setLang(lang) {
    this.languaje = this.UtilsService.setLang(lang);
  }

  openLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = { top: '50px' }
    dialogConfig.data = { id: 1, title: 'Iniciar sesion' }
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  openCloseModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = { top: '50px' }
    dialogConfig.data = { id: 1, title: 'Registrate' }
    const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  openModalvalidate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = { top: '50px' }
    dialogConfig.data = { id: 2, title: 'validar' }
    const dialogRef = this.dialog.open(ValidateUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
    });
  }

}
