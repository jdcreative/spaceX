import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataUserService } from './../../service/data-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  description: string;
  formlogin:FormGroup;
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    public data_user: DataUserService
  ) {
    this.description = data.title;
    this.buildlogin();
  }

  ngOnInit() {
  }
  buildlogin(){
    this.formlogin = this.fb.group({
      email:['', [Validators.required]]
    });
    this.formlogin.valueChanges.subscribe(res=>{
      console.log('login : ', res);
    })
  }
  login(e:Event){
    e.preventDefault();
    if(this.formlogin.valid){
      const data = this.formlogin.value;
      console.log('formulary : ', data);
      this.data_user.getDataUser(data.email).subscribe(res=>{
        console.log('lo que recibo del user: ',res)
      }, err =>{console.log(  'error:', err)})
    }
  }
  closeModal(){
    this.formlogin.reset();
    this.dialogRef.close();
  }
}
