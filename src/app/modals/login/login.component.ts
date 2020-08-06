import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DataUserService } from './../../service/data-user.service';
import { SignUpComponent } from './../../modals/sign-up/sign-up.component';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/service/utils.service';
import { UsernameValidator } from './nowhitespacevalidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  description: string;
  submitted: boolean = false;
  statusLoading: boolean = false;
  statusLoadingSend: boolean = false;
  noCodeStatus: boolean = true;
  //Alerts
  showCodeSatus: boolean = false;
  //SHOW
  sendCodeEmail: boolean = false;
  buttonUserStatus: boolean = false;
  buttonCancelStatus: boolean = false;
  showLoginTitle: boolean = true;
  showSendTitle: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    public data_user: DataUserService,
    public router: Router,
    private dialog: MatDialog,
    private utils: UtilsService
  ) {
    this.description = data.title;
    this.buildlogin();
  }

  get form() { return this.formLogin.controls; }

  ngOnInit() { }

  buildlogin() {

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email, UsernameValidator.cannotContainSpace]],
      code: ['', [Validators.required, Validators.minLength(6), Validators.pattern("[0-9]+")]]
    });

  }

  login() {

    this.submitted = true;
    this.statusLoading = true;

    if (this.formLogin.valid) {

      let data = this.formLogin.value;

      this.formLogin.controls['email'].disable();
      this.formLogin.controls['code'].disable();

      this.data_user.getAuthToken(data.email, data.code).subscribe(res => {

        this.statusLoading = false;

        if (res.estado == false) {

          this.formLogin.controls['email'].enable();
          this.formLogin.controls['code'].enable();
          this.showCodeSatus = true;

          setTimeout(() => {
            this.showCodeSatus = false;
          }, 7000);

        } else {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res[0]));
          this.dialogRef.close();
          this.router.navigate(["/profile"]);
        }

      }, err => {
        console.log("ERROR IN API", err);
        this.showCodeSatus = true;
      });

    } else {
      this.statusLoading = false;
    }

  }

  showregister() {

    this.closeModal();
    setTimeout(() => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = true;
      dialogConfig.position = { top: '50px' }
      dialogConfig.data = {
        id: 1,
        title: 'Iniciar sesion'
      }
      const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(res => { })
    }, 1000);
  }

  userNoCode() {
    this.noCodeStatus = false;
    this.buttonUserStatus = true;
    this.buttonCancelStatus = true;
    this.showSendTitle = true;
    this.showLoginTitle = false;
  }

  sendUserNoCode() {

    this.buttonCancelStatus = false;
    this.statusLoadingSend = true;

    let email = this.formLogin.value.email;

    if (email) {

      this.showLoginTitle = true;
      this.showSendTitle = false;

      this.data_user.getCodeSesion(email).subscribe((res) => {
        // console.log(res)
        if (res.estado == false) {

          this.showCodeSatus = true;
          this.noCodeStatus = false;
          setTimeout(() => {
            this.showCodeSatus = false;
          }, 7000);

        } else {
          
          this.noCodeStatus = true;
          this.sendCodeEmail = true;
          this.buttonUserStatus = false;
          setTimeout(() => {
            this.sendCodeEmail = false;
          }, 25000);

        }
      });

      this.statusLoadingSend = false;

    } else {
      this.buttonUserStatus = true;
    }

  }

  cancelNoCode() {
    this.buttonUserStatus = false;
    this.noCodeStatus = true;
    this.buttonCancelStatus = false;
    this.showSendTitle = false;
    this.showLoginTitle = true;
    this.formLogin.reset();
  }

  toLower(event) {
    this.formLogin.get("email").setValue(event.target.value.toLowerCase());
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  closeModal() {
    this.formLogin.reset();
    this.dialogRef.close();
  }

}