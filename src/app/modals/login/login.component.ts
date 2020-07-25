import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataUserService } from './../../service/data-user.service';
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
  validationCode: boolean = false;
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
        if (res) {
          this.dataForm = res;
          this.validationCode = true;
        }
        this.currentState = 1;
      }, err => { console.log('error:', err) })
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
              this.validationCode = false;
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

  closeModal() {
    this.formlogin.reset();
    this.dialogRef.close();
  }
}
