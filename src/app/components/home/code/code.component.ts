import { Component, OnInit } from '@angular/core';
import { DataUserService } from 'src/app/service/data-user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsernameValidator } from 'src/app/modals/login/nowhitespacevalidator';

import { LoginComponent } from '../../../modals/login/login.component';
import { SignUpComponent } from '../../../modals/sign-up/sign-up.component';
import { ValidateUserComponent } from '../../../modals/validate-user/validate-user.component'
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UtilsService } from "../../../service/utils.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  formCode: FormGroup;
  codigo: any;
  show: boolean = false;
  languaje: any;
  isOpenClose: boolean = false;

  constructor(
    public data_user: DataUserService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private UtilsService: UtilsService,
    private router: Router
    
  ) {
    this.buildlogin();
   }

  get form() { return this.formCode.controls; }

  ngOnInit() { }

  buildlogin() {

    this.formCode = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email,UsernameValidator.cannotContainSpace]]
    });

  }

  sendUserNoCode() {
    if(this.formCode.valid){
      let email = this.formCode.value.email;
      if (email) {
        this.data_user.getCodeSesion(email).subscribe((res) => {
          if (res.estado != false) {
              console.log("Respuesta:")
              //console.log(res)
              this.show = false;
              this.codigo = res.code;
              console.log(this.codigo)
          } else {
            this.show = true;
            this.codigo = "Usuario no registrado"
            console.log("Respuesta:")
            console.log(res)
  
          }
        });
  
      
  
      } else {
        console.log('Email Invalido')
      }
    }else{
      
    }
    

  }

  toLower(event) {
    this.formCode.get("email").setValue(event.target.value.toLowerCase());
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
