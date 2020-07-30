import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DataUserService } from './../../service/data-user.service';
import { SignUpComponent } from './../../modals/sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  formCode: FormGroup;
  currentState = 0;
  validationCode: number = 0;
  statusLoading: boolean = false;
  showAlert: boolean = false;
  emailNotFound: boolean = false;
  loginValidation: boolean = false;
  errorOccurred: boolean = false;
  dataForm: any;
  description: string;
  tempEmail: string;
  tempToken: string;
  error_messages = {
    'email': [
      { type: 'required', message: 'El correo es requerido' },
      { type: 'minlength', message: 'El correo debe tener mínimo 1 caracter.' },
      { type: 'pattern', message: 'El correo ingresado no es válido.' }
    ]
  };

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
    this.validationCodeInitial();
  }

  validationCodeInitial() {
    let usTemp = JSON.parse(localStorage.getItem("tempUs"));
    if (usTemp) {
      // console.log("US TEMP HERE", usTemp);
      this.tempEmail = usTemp.email;
      this.validationCode = 2;
    } else {
      this.validationCode = 0;
    }
  }

  buildlogin() {

    this.formLogin = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])),
    });

    this.formCode = this.fb.group({
      code: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(6)
      ])),
    });

    // this.formlogin.valueChanges.subscribe(res => {
    //   // console.log('login : ', res);
    // });
  }

  login(e: Event) {

    e.preventDefault();
    this.loginValidation = true;

    if (this.formLogin.valid) {

      const data = this.formLogin.value;
      this.tempEmail = data.email;
      this.data_user.getCodeSesion(data.email).subscribe(res => {
        // console.log("RESSSS", res);
        if (res.email) {
          this.dataForm = res;
          // console.log("DATA: ", this.dataForm);
          this.validationCode = 2;
          localStorage.setItem("tempUs", JSON.stringify({ email: data.email, code: res.code }));
        } else if (res.estado == false) {
          this.validationCode = 3;
          this.loginValidation = false;
        }

      }, err => {
        this.loginValidation = false;
        this.errorOccurred = true;
        console.log("ERROR IN LOGIN METHOD: ", err)
      });

    }

  }

  saveValidation() {

    if (this.dataForm == undefined) {
      this.dataForm = JSON.parse(localStorage.getItem("tempUs"));
    }

    if (parseInt(this.formCode.value.code) == this.dataForm.code) {

      this.statusLoading = true;

      this.data_user.getAuthToken(this.dataForm.email, this.dataForm.code).subscribe((res) => {

        this.tempToken = res.token;
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
              localStorage.removeItem("tempUs");
              localStorage.setItem("token", this.tempToken);
              localStorage.setItem("user", JSON.stringify(res));
              this.dialogRef.close();
              this.router.navigate(["/profile"]);
            }

          });
        } else {
          console.log("OCURRIÓ UN ERROR");
          this.statusLoading = false;
        }

      });

    } else {
      this.statusLoading = false;
      this.showAlert = true;
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

  toLower(event) {
    this.formLogin.get("email").setValue(event.target.value.toLowerCase());
  }

  closeModal() {
    this.formLogin.reset();
    this.dialogRef.close();
  }

}
