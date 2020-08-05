import { Component, OnInit } from '@angular/core';
import { DataUserService } from 'src/app/service/data-user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  formCode: FormGroup;
  codigo: any;

  constructor(
    public data_user: DataUserService,
    private fb: FormBuilder,
    
  ) {
    this.buildlogin();
   }

  get form() { return this.formCode.controls; }

  ngOnInit() { }

  buildlogin() {

    this.formCode = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]]
    });

  }

  sendUserNoCode() {

    let email = this.formCode.value.email;
    if (email) {
      this.data_user.getCodeSesion(email).subscribe((res) => {
        if (res.estado != false) {
            console.log("Respuesta:")
            //console.log(res)
            this.codigo = res.code;
            console.log(this.codigo)
        } else {

          this.codigo = "Usuario no registrado"
          console.log("Respuesta:")
          console.log(res)

        }
      });

    

    } else {
      console.log('Email Invalido')
    }

  }

  toLower(event) {
    this.formCode.get("email").setValue(event.target.value.toLowerCase());
  }

}
