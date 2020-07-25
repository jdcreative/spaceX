import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog,MatDialogConfig} from "@angular/material";
import { DataUserService } from './../../service/data-user.service';
import {SignUpComponent} from './../../modals/sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  description: string;
  formlogin: FormGroup;
  currentState = 0;
  validationCode: number = 0;
  statusLoading: boolean = false;
  showAlert: boolean = false;
  emailNotFound: boolean = false;
  dataForm: any;
  code: string;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    public data_user: DataUserService,
    public router: Router,
    private dialog: MatDialog
  ) {
    this.description = data.title;
    this.buildlogin();
  }

  ngOnInit() {
  }
  buildlogin() {
    this.formlogin = this.fb.group({
      email: ['', [Validators.required]]
    });
    this.formlogin.valueChanges.subscribe(res => {
      // console.log('login : ', res);
    });
  }
  login(e: Event) {
    e.preventDefault();
    if (this.formlogin.valid) {
      const data = this.formlogin.value;
      this.data_user.getCodeSesion(data.email).subscribe(res => {
        // console.log('res incial: ', res);
        if (res.email) {
          this.dataForm = res;
          this.validationCode = 2;          
        }else if (res.estado == false) {
          // console.log('res del estado : ', res.estado)
          this.validationCode = 3;          
        }        
      }, err => { 
        // console.log('error:', err) 
      })
      
    }
  }

  saveValidation() {
    if (parseInt(this.code) == this.dataForm.code) {
      this.statusLoading = true;
      this.data_user.getAuthToken(this.dataForm.email, this.dataForm.code).subscribe((res) => {
        this.statusLoading = false;
        if (res.token) {
          this.showAlert = false;
          this.data_user.getDataUser(this.dataForm.email).subscribe((res) => {
            if (res.detail == "no existe") {
              this.emailNotFound = true;
              setTimeout(() => {
                this.dialogRef.close();
              }, 2000);
            } else {
              // this.validationCode = false;
              this.code = "";
              localStorage.setItem("token", res.token);
              localStorage.setItem("user", JSON.stringify(res));
              this.dialogRef.close();
              this.router.navigate(["/profile"]);
            }

          });
        } else {
          console.log("OCURRIÓ UN ERROR");
        }
      })
    } else {
      this.statusLoading = false;
      this.showAlert = true;
    }
  }
  showregister() {
    this.closeModal()
    setTimeout(() => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = true;
      dialogConfig.position = {top: '50px'}
      dialogConfig.data = {
        id: 1,
        title: 'Iniciar sesion'
      }
      const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(res => {})
    }, 1000);
  }
  closeModal() {
    this.formlogin.reset();
    this.dialogRef.close();
  }
}
