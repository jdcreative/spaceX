import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import {
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  SignUpComponent
} from './../../modals/sign-up/sign-up.component';
import {
  FirestoreService
} from './../../service/firestore.service';
import {
  UtilsService
} from './../../service/utils.service'
import {
  DataUserService
} from './../../service/data-user.service';
import {
  userInterface
} from '../../interfaces/user_interface';
import {
  apicountry
} from './../../service/apicountry';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.css']
})
export class ValidateUserComponent implements OnInit {

  description: string;
  formValid: FormGroup;
  formUpdate: FormGroup;
  formValidateCode: FormGroup;
  mailPattern: any = /^[a-z0-9._%+-]{1,40}[@]{1}[a-z]{1,40}[.]{1}[a-z.]{2,6}$/;
  numberPattern: any = /^[0-9]{6}$/;
  public dataUser = [];
  private idUser = [];
  dateRegister: any;
  selectedUser: userInterface = new userInterface();
  currentState: number = 0;
  codeUser: number;
  errCode: string = '';
  mailCode: string = '';
  loaderButton:boolean=false;

  validSede: boolean = false;
  validRed: boolean = false;
  validRedMen: boolean = false;
  validredWomen: boolean = false;
  validMinisterio: string = '';
  validEliemerson: boolean = false;
  validJohana: boolean = false;
  validLau: boolean = false;
  validSara: boolean = false;
  validTwelve: boolean = false;
  validOtraIglesia: boolean = false;
  countries = apicountry;
  loader: boolean = false;
  language = [{
    'name': 'English'
  }, {
    'name': 'Español'
  }, {
    'name': 'português'
  }];
  pastoras = [{
      name: 'Margarita Cataño',
      value: 'Margarita Cataño'
    },
    {
      name: 'Ruth Jimena Castañeda',
      value: 'ruth jimena castañeda'
    },
    {
      name: 'Anita Alonso',
      value: 'Anita Alonso'
    },
    {
      name: 'Clara Sandoval',
      value: 'Clara sandoval'
    },
    {
      name: 'Olga Morales',
      value: 'Olga morales'
    },
    {
      name: 'Manuela Castellanos',
      value: 'Manuela castellanos'
    },
    {
      name: 'Johanna Proenca',
      value: 'Johanna_proenca'
    },
    {
      name: 'Lorena Gamba',
      value: 'Lorena gamba'
    },
    {
      name: 'Erika Berrios',
      value: 'Erika berrios'
    },
    {
      name: 'Janeth de Barrios',
      value: 'Janeth de barrios'
    },
    {
      name: 'Angela Espinosa',
      value: 'Angela espinosa'
    },
    {
      name: 'Perla Doris mora',
      value: 'perla doris mora'
    },
    {
      name: 'Sara Castellanos',
      value: 'sara_castellanos'
    },
  ]
  pastores = [{
      name: 'Jorge Andrés Cataño',
      value: 'Jorge Andres Cataño'
    },
    {
      name: 'Orlando Castañeda',
      value: 'Orlando Castañeda'
    },
    {
      name: 'Alaín Alonso',
      value: 'Alaín Alonso'
    },
    {
      name: 'Fernando Ramos',
      value: 'Fernando Ramos'
    },
    {
      name: 'Miguel Morales',
      value: 'Miguel Morales'
    },
    {
      name: 'Rich Harding',
      value: 'Rich Harding'
    },
    {
      name: 'Eliemerson Proenca',
      value: 'eliemerson_proenca'
    },
    {
      name: 'Julian Gamba',
      value: 'Julian Gamba'
    },
    {
      name: 'Daniel Berrios',
      value: 'Daniel Berrios'
    },
    {
      name: 'Luis Barrios',
      value: 'Luis Barrios'
    },
    {
      name: 'John Espinosa',
      value: 'John Espinosa'
    },
    {
      name: 'Alfredo Mora',
      value: 'Alfredo Mora'
    },
    {
      name: 'Lau Guerra',
      value: 'lau_guerra'
    },
  ]
  eliemerson = [{
      name: 'Elkin German Gamba Velasquez'
    },
    {
      name: 'Jaime Armando Rodriguez Gomez'
    },
    {
      name: 'Rigoberto Jimenez Bello'
    },
    {
      name: 'Ramiro Munar Mejia'
    },
    {
      name: 'Jorge Alberto Puerto Vega'
    },
    {
      name: 'Luis Alejandro Rey Cala'
    },
    {
      name: 'Jesus Alberto Villarraga Paez'
    },
    {
      name: 'Jahems Samir Ordoñez Moreno'
    },
    {
      name: 'Antonio Blanco Vaquero'
    },
    {
      name: 'Daniel Garzon Cantor'
    },
    {
      name: 'Alberto Castellanos'
    },
    {
      name: 'Grupo Jovenes Proenca'
    },
  ];
  johana = [{
      name: 'Gina Alexandra Erazo'
    },
    {
      name: 'Claudia Wilches'
    },
    {
      name: 'Esperanza Jimenez'
    },
    {
      name: 'Luz Maribel Munar'
    },
    {
      name: 'Olga Nidia Avila'
    },
    {
      name: 'Rossemarie Rizzo'
    },
    {
      name: 'Doris Gonzalez'
    },
    {
      name: 'Esneth Yolanda Orjuela Murillo'
    },
    {
      name: 'Helena de Blanco'
    },
    {
      name: 'Jessica Garzon'
    },
    {
      name: 'Nancy Castellanos'
    },
    {
      name: 'Grupo Jovenes Proenca'
    },
  ]
  lau = [{
      name: 'Henry Samuel Romero Umaña'
    },
    {
      name: 'Joshua Wout de Boer'
    },
    {
      name: 'Andres Alejandro Villamil'
    },
    {
      name: 'Leandro Alberto Baron Torre'
    },
    {
      name: 'Michael del Castillo'
    },
    {
      name: 'Juan sebastian Rodriguez'
    },
    {
      name: 'Jeofreddy Alvarez Quinche'
    },
    {
      name: 'Cristian Daniel Castillo'
    },
    {
      name: 'Oscar Leonardo Pineda Ortiz'
    },
    {
      name: 'Johan Leonardo Manjarres'
    },
    {
      name: 'Juan Camilo Echeverria'
    },
    {
      name: 'Josue David Munar Buitrago'
    },
    {
      name: 'Raúl Arevalo'
    },
    {
      name: 'Equipo Pre (Jovenes)'
    },
  ];
  sara = [{
      name: 'Katerin Andrea Gil Caro'
    },
    {
      name: 'Michelle Morales Poveda'
    },
    {
      name: 'Yury Pineda Sanchez'
    },
    {
      name: 'Carolina Varela'
    },
    {
      name: 'Edna Rocio Bastos'
    },
    {
      name: 'Gina Ramirez Sanchez'
    },
    {
      name: 'Ingrid Julissa Rojas Amado'
    },
    {
      name: 'Nataly Peña'
    },
    {
      name: 'Maria Camila Cantor'
    },
    {
      name: 'Sofia Mancipe Quintero'
    },
    {
      name: 'Maria José Anaya'
    },
    {
      name: 'Camila Pabón'
    },
    {
      name: 'Lina Toro'
    },
    {
      name: 'Saida Calderón'
    },
    {
      name: 'Equipo Pre (Jovenes)'
    },
  ]


  constructor(
    private dialogRef: MatDialogRef < ValidateUserComponent > ,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private fire: FirestoreService,
    public util: UtilsService,
    public data_user: DataUserService,
    private dialog: MatDialog
  ) {
    this.description = data.title;
    this.buildForm();
    this.buildValidateCode();
    this.buildFormUpdate();
  }

  ngOnInit() {}
  // valid mail form
  buildForm() {
    this.formValid = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.mailPattern)]]
    });
  }
  get validatorMail() 
  {
    return this.formValid.get('email')
  };
  validateForm(e: Event) {
    this.loaderButton = true;
    e.preventDefault();
    if (this.formValid.valid) 
    {
      const data = this.formValid.value;
      //auth del usuario
      this.data_user.getDataUser(data.email).subscribe(res => 
      {
        if (res.email) 
        {
          this.currentState = 1;
          this.loaderButton = false;
          this.selectedUser = res;
          setTimeout(() => 
          {
            this.setValues();
          }, 200);
          this.data_user.getCodeSesion(data.email).subscribe(res => {
            this.mailCode = data.email;
            this.codeUser = res.code;
            // console.log('res de code:', res);
          }, err => {
            // console.log('error: ', err)
          });

        } else if (res.estado == false) {
          this.currentState = 6;
          this.loaderButton = false;
        }
      }, err => {
        console.log('err :', err)
      });
    }
  }
  // validate code
  buildValidateCode() 
  {
      this.formValidateCode = this.fb.group
      (
        {
            code: ['', [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(6)]]
        }
      )
  }

  get code() 
  {
    return this.formValidateCode.get('code')
  };

  validateCode(e: Event) {
    this.loaderButton = true;
    e.preventDefault();
    if (this.formValidateCode.valid) {
      const data = this.formValidateCode.value;
      // console.log('la data del code: ',data.code)
      // console.log('code: ', this.codeUser)
      if (data.code == this.codeUser) {
        this.currentState = 2;
        this.loaderButton = false;
      } else {
        this.errCode = 'El codigo que has ingresado es incorrecto, intentalo de nuevo';
        this.loaderButton = false;
      }

    }
  }
  // update data form
  buildFormUpdate() 
  {
      this.formUpdate = this.fb.group
      (
        {
            nombre: ['', [Validators.required]],
            apellidos: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(this.mailPattern)]],
            celular: ['', [Validators.required]],
            telefono: [''],
            edad: ['', [Validators.required]],
            pais: ['', [Validators.required]],
            ciudad: ['', [Validators.required]],
            iglesia: ['', [Validators.required]],
            otraIglesia: [''],
            sedeMci: [''],
            red: [''],
            redHombres: [''],
            redMujeres: [''],
            redEliemerson: [''],
            redJohanna: [''],
            redLauGuerra: [''],
            redSaraCastellanos: [''],
            liderPrincipal: [''],
            idioma: ['', [Validators.required]],
            talleres: ['', [Validators.required]],
            terminosYCondiciones: [true, [Validators.required]],
            tribu: [''],
            updated: [true]
      }
    );
    this.formUpdate.valueChanges.subscribe(res => 
    {
      if (res.iglesia == 'pertenece_mci') { this.validSede = true; this.validTwelve = false; this.validOtraIglesia = false }
      else if (res.iglesia == 'otra_iglesia') {
        this.validOtraIglesia = true; this.validSede = false; this.validRed = false; 
        this.validRedMen = false; this.validredWomen = false;
        res.sedeMci = '';
        res.red = '';
        res.redHombres = '';
        res.redMujeres = '';
        res.liderPrincipal = '';
      }
      else if (res.iglesia == 'G12_church') {
        
        this.validTwelve = true; this.validOtraIglesia = false; this.validSede = false; this.validRed = false;
        this.validRedMen = false; this.validredWomen = false;
        res.sedeMci = '';
        res.red = '';
        res.redHombres = '';
        res.redMujeres = '';
        res.liderPrincipal = '';
      }
      else {
        this.validSede = false; this.validOtraIglesia = false; this.validRed = false; this.validredWomen = false;
        this.validRedMen = false; this.validTwelve = false;
        res.sedeMci = '';
        res.red = '';
        res.redHombres = '';
        res.redMujeres = '';
        res.liderPrincipal = '';
      };


      if (res.sedeMci == 'bogota_principal') { this.validRed = true }
      else { this.validRed = false; this.validRedMen = false };

      if(res.sedeMci != 'bogota_principal'){
        res.red = '';
        res.redHombres = '';
        res.redMujeres = '';
        res.liderPrincipal = '';
      }

      if (res.red == 'Mujeres') {
        this.validredWomen = true; this.validRedMen = false; this.validEliemerson = false;
        this.validLau = false; res.redHombres = '';
      }
      else if (res.red == 'Hombres') {
        this.validredWomen = false; this.validRedMen = true; this.validJohana = false;
        this.validSara = false; res.redMujeres = ''
      };


      if (res.redHombres == 'lau_guerra') {
        this.validEliemerson = false; this.validLau = true; this.validJohana = false; this.validSara = false;
        res.redJohanna = '';
        res.redSaraCastellanos = '';
        res.redEliemerson = '';
      }
      else if (res.redHombres == 'eliemerson_proenca') {
        this.validEliemerson = true; this.validLau = false; this.validJohana = false; this.validSara = false;
        res.redJohanna = '';
        res.redSaraCastellanos = '';
        res.redLauGuerra = '';
      }
      else if (res.redMujeres == 'Johanna_proenca') {
        this.validEliemerson = false; this.validLau = false; this.validJohana = true; this.validSara = false;
        res.redSaraCastellanos = '';
        res.redEliemerson = '';
        res.redLauGuerra = '';
      }
      else if (res.redMujeres == 'sara_castellanos') {
        this.validEliemerson = false; this.validLau = false; this.validJohana = false; this.validSara = true;
        res.redJohanna = '';
        res.redEliemerson = '';
        res.redLauGuerra = '';
      }
      else {
        this.validEliemerson = false; this.validLau = false; this.validJohana = false; this.validSara = false;
        res.redJohanna = '';
        res.redSaraCastellanos = '';
        res.redEliemerson = '';
        res.redLauGuerra = '';
      }
      // console.log('formulary data: ', res)
    })
  };
  get nameUpdate() {
    return this.formUpdate.get('nombre')
  };
  get lastUpdate() {
    return this.formUpdate.get('apellidos')
  };
  get mailUpdate() {
    return this.formUpdate.get('email')
  };
  get phoneUpdate() {
    return this.formUpdate.get('celular')
  };
  get ageUpdate() {
    return this.formUpdate.get('edad')
  };
  get countryUpdate() {
    return this.formUpdate.get('pais')
  };
  get cityUpdate() {
    return this.formUpdate.get('ciudad')
  };
  get churchUpdate() {
    return this.formUpdate.get('iglesia')
  };
  get languageUpdate() {
    return this.formUpdate.get('idioma')
  };
  get workShopUpdate() {
    return this.formUpdate.get('talleres')
  };
  get terminos() {
    return this.formUpdate.get('terminosYCondiciones')
  };
  setValues() {
    this.formUpdate.controls['nombre'].setValue(this.selectedUser.nombre);
    this.formUpdate.controls['apellidos'].setValue(this.selectedUser.apellidos);
    this.formUpdate.controls['email'].setValue(this.selectedUser.email);
    this.formUpdate.controls['celular'].setValue(this.selectedUser.celular);
    this.formUpdate.controls['telefono'].setValue(this.selectedUser.telefono);
    this.formUpdate.controls['edad'].setValue(this.selectedUser.edad);
    this.formUpdate.controls['pais'].setValue(this.selectedUser.pais);
    this.formUpdate.controls['ciudad'].setValue(this.selectedUser.ciudad);
    this.formUpdate.controls['iglesia'].setValue(this.selectedUser.iglesia);
    this.formUpdate.controls['otraIglesia'].setValue(this.selectedUser.otraIglesia);
    this.formUpdate.controls['sedeMci'].setValue(this.selectedUser.sedeMci);
    this.formUpdate.controls['red'].setValue(this.selectedUser.red);
    this.formUpdate.controls['redHombres'].setValue(this.selectedUser.redHombres);
    this.formUpdate.controls['redMujeres'].setValue(this.selectedUser.redMujeres);
    this.formUpdate.controls['redEliemerson'].setValue(this.selectedUser.redEliemerson);
    this.formUpdate.controls['redJohanna'].setValue(this.selectedUser.redJohanna);
    this.formUpdate.controls['redLauGuerra'].setValue(this.selectedUser.redLauGuerra);
    this.formUpdate.controls['redSaraCastellanos'].setValue(this.selectedUser.redSaraCastellanos);
    this.formUpdate.controls['liderPrincipal'].setValue(this.selectedUser.liderPrincipal);
    this.formUpdate.controls['idioma'].setValue(this.selectedUser.idioma);
    this.formUpdate.controls['talleres'].setValue(this.selectedUser.talleres);
    this.formUpdate.controls['terminosYCondiciones'].setValue(this.selectedUser.terminosYCondiciones);
  }
  updateUser(e: Event) {
    this.loaderButton = true;
    e.preventDefault;
    if (this.formUpdate.valid) 
    {
      const data = this.formUpdate.value;
      this.data_user.updateDataUser(data).subscribe(res => 
        {
        if (res == true) 
        {
          setTimeout(() => 
          {
            this.currentState = 4;
            this.loaderButton = false;
          }, 200);
        } else 
        {
          setTimeout(() => 
          {
            this.currentState = 5;
            this.loaderButton = false;
          }, 200);
        }
      }, err => 
      {
        console.error('error del update: ', err)
      })
    }
  }
  closemodal() 
  {
    this.formValid.reset();
    this.formValidateCode.reset();
    this.formUpdate.reset();
    this.dialogRef.close();
  }

  showregister() 
  {
    this.closemodal()
    setTimeout(() => 
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = true;
      dialogConfig.position = 
      {
        top: '50px'
      }
      dialogConfig.data = 
      {
        id: 1,
        title: 'Iniciar sesion'
      }
      const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(res => {})
    }, 1000);

  }

}
