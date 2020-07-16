import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirestoreService } from './../../service/firestore.service';
import { userInterface } from '../../interfaces/user_interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  description: string;
  registerForm: FormGroup;
  // public dataUser=[];
  country = [{
    data: [
      {'name': 'colombia'},
      {'name': 'Italia'},
      {'name': 'Mexico'}
    ]

  }];
  countries: any;
  cities = 0;
  language = [{ 'name': 'English' }, { 'name': 'Español' }, { 'name': 'português' }];
  pastoras = [
    { name: 'Margarita Cataño', value:'Margarita Cataño'},
    { name: 'Ruth Jimena Castañeda', value:'ruth jimena castañeda' },
    { name: 'Anita Alonso', value:'Anita Alonso' },
    { name: 'Clara Sandoval', value:'Clara sandoval' },
    { name: 'Olga Morales', value:'Olga morales' },
    { name: 'Manuela Castellanos', value:'Manuela castellanos' },
    { name: 'Johanna Proenca', value:'Johanna_proenca' },
    { name: 'Lorena Gamba', value:'Lorena gamba' },
    { name: 'Erika Berrios', value:'Erika berrios' },
    { name: 'Janeth de Barrios', value:'Janeth de barrios' },
    { name: 'Angela Espinosa', value:'Angela espinosa' },
    { name: 'Perla Doris mora', value:'perla doris mora' },
    { name: 'Sara Castellanos', value:'sara_castellanos' },
  ]
  pastores = [
    { name: 'Jorge Andrés Cataño',value:'Jorge Andres Cataño'},
    { name: 'Orlando Castañeda', value:'Orlando Castañeda'},
    { name: 'Alaín Alonso', value:'Alaín Alonso' },
    { name: 'Fernando Ramos', value:'Fernando Ramos' },
    { name: 'Miguel Morales', value:'Miguel Morales' },
    { name: 'Rich Harding', value:'Rich Harding' },
    { name: 'Eliemerson Proenca', value:'eliemerson_proenca' },
    { name: 'Julian Gamba', value:'Julian Gamba' },
    { name: 'Daniel Berrios', value:'Daniel Berrios' },
    { name: 'Luis Barrios', value:'Luis Barrios' },
    { name: 'John Espinosa', value:'John Espinosa' },
    { name: 'Alfredo Mora', value:'Alfredo Mora' },
    { name: 'Lau Guerra', value:'lau_guerra' },
  ]
  eliemerson = [
    { name: 'Elkin German Gamba Velasquez' },
    { name: 'Jaime Armando Rodriguez Gomez' },
    { name: 'Rigoberto Jimenez Bello' },
    { name: 'Ramiro Munar Mejia' },
    { name: 'Jorge Alberto Puerto Vega' },
    { name: 'Luis Alejandro Rey Cala' },
    { name: 'Jesus Alberto Villarraga Paez' },
    { name: 'Jahems Samir Ordoñez Moreno' },
    { name: 'Antonio Blanco Vaquero' },
    { name: 'Daniel Garzon Cantor' },
    { name: 'Alberto Castellanos' },
    { name: 'Grupo Jovenes Proenca' },
  ];
  johana = [
    { name: 'Gina Alexandra Erazo' },
    { name: 'Claudia Wilches' },
    { name: 'Esperanza Jimenez' },
    { name: 'Luz Maribel Munar' },
    { name: 'Olga Nidia Avila' },
    { name: 'Rossemarie Rizzo' },
    { name: 'Doris Gonzalez' },
    { name: 'Esneth Yolanda Orjuela Murillo' },
    { name: 'Helena de Blanco' },
    { name: 'Jessica Garzon' },
    { name: 'Nancy Castellanos' },
    { name: 'Grupo Jovenes Proenca' },
  ]
  lau = [
    { name: 'Henry Samuel Romero Umaña' },
    { name: 'Joshua Wout de Boer' },
    { name: 'Andres Alejandro Villamil' },
    { name: 'Leandro Alberto Baron Torre' },
    { name: 'Michael del Castillo' },
    { name: 'Juan sebastian Rodriguez' },
    { name: 'Jeofreddy Alvarez Quinche' },
    { name: 'Cristian Daniel Castillo' },
    { name: 'Oscar Leonardo Pineda Ortiz' },
    { name: 'Johan Leonardo Manjarres' },
    { name: 'Juan Camilo Echeverria' },
    { name: 'Josue David Munar Buitrago' },
    { name: 'Raúl Arevalo' },
    { name: 'Equipo Pre (Jovenes)' },
  ];
  sara = [
    { name: 'Katerin Andrea Gil Caro' },
    { name: 'Michelle Morales Poveda' },
    { name: 'Yury Pineda Sanchez' },
    { name: 'Carolina Varela' },
    { name: 'Edna Rocio Bastos' },
    { name: 'Gina Ramirez Sanchez' },
    { name: 'Ingrid Julissa Rojas Amado' },
    { name: 'Nataly Peña' },
    { name: 'Maria Camila Cantor' },
    { name: 'Sofia Mancipe Quintero' },
    { name: 'Maria José Anaya' },
    { name: 'Camila Pabón' },
    { name: 'Lina Toro' },
    { name: 'Saida Calderón' },
    { name: 'Equipo Pre (Jovenes)' },
  ]

  validSede: boolean = false;
  validRed: boolean = false;
  validRedMen: boolean = false;
  validredWomen: boolean = false;
  validMinisterio: string = '';
  validEliemerson:boolean=false;
  validJohana:boolean=false;
  validLau:boolean=false;
  validSara:boolean=false;
  validTwelve: boolean = false;
  validOtraIglesia: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<SignUpComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private fire: FirestoreService
  ) {
    this.description = data.title;
    this.buildFormRegister();
  }

  ngOnInit() {
    this.getCountries();        
  }

  getCountries() {
    this.country.map(res => {
      this.countries = res.data;    
    })
  }  
  buildFormRegister() {
    this.registerForm = this.fb.group({
      nombre: [''],
      apellidos: [''],
      email: [''],
      celular: [''],
      telefono: [''],
      edad: [''],
      pais: [''],
      ciudad: [''],
      iglesia: [''],
      otraIglesia: [''],
      sedeMci: [''],
      red: [''],
      redHombres:[''],
      redMujeres:[''],
      // pastorPrincipal: [''],
      redEliemerson:[''],
      redJohanna:[''],
      redLauGuerra:[''],
      redSaraCastellanos:[''],
      liderPrincipal: [''],
      idioma: [''],
      talleres: [''],
      firebase: [true],
      terminosYCondiciones: [true]
    })
    this.registerForm.valueChanges.subscribe(res => {

      if(res.iglesia == 'pertenece_mci'){this.validSede=true; this.validOtraIglesia=false}
      else if(res.iglesia == 'otra_iglesia'){
        this.validOtraIglesia=true; this.validSede=false; this.validRed=false; 
        this.validRedMen=false; this.validredWomen=false; this.validTwelve=false}
      else if(res.iglesia == 'G12_church'){
        this.validOtraIglesia=false; this.validSede=false; this.validRed=false;
        this.validRedMen=false; this.validredWomen=false; this.validTwelve=true;
      }
      else{this.validSede=false; this.validOtraIglesia=false; this.validRed=false; this.validredWomen=false; this.validRedMen=false; this.validTwelve=false}

      if(res.sedeMci == 'bogota_principal'){this.validRed=true}
      else{this.validRed=false; this.validRedMen=false}

      if(res.red == 'Mujeres'){
        this.validredWomen=true; this.validRedMen=false; this.validEliemerson=false; 
        this.validLau=false; res.redHombres=''; }
      else if(res.red == 'Hombres'){
        this.validredWomen=false; this.validRedMen=true; this.validJohana=false; 
        this.validSara=false; res.redMujeres=''}
      
        if(res.redHombres == 'lau_guerra'){
          this.validEliemerson=false; this.validLau=true; this.validJohana=false; this.validSara=false;
          res.redJohanna='';
          res.redSaraCastellanos='';
          res.redEliemerson='';        
        }
        else if(res.redHombres == 'eliemerson_proenca'){
          this.validEliemerson=true; this.validLau=false; this.validJohana=false; this.validSara=false;
          res.redJohanna='';
          res.redSaraCastellanos='';        
          res.redLauGuerra='';
        }
        else if(res.redMujeres == 'Johanna_proenca'){
          this.validEliemerson=false; this.validLau=false; this.validJohana=true; this.validSara=false;        
          res.redSaraCastellanos='';
          res.redEliemerson='';
          res.redLauGuerra='';      
        }
        else if(res.redMujeres == 'sara_castellanos'){
          this.validEliemerson=false; this.validLau=false; this.validJohana=false; this.validSara=true;
          res.redJohanna='';        
          res.redEliemerson='';
          res.redLauGuerra='';        
        }
        else{
          this.validEliemerson=false; this.validLau=false; this.validJohana=false; this.validSara=false;
          res.redJohanna='';
          res.redSaraCastellanos='';
          res.redEliemerson='';
          res.redLauGuerra='';        
        }  

      console.log('respuesta: ', res)
    })
  }
  
  saveUser(e: Event) {
    e.preventDefault();
    if(this.registerForm.valid){
      const data = this.registerForm.value;
      this.fire.newUser(data)
    }
    this.registerForm.reset();
  }
  save() {
    this.dialogRef.close();
  }
  close() {
    this.registerForm.reset();
    this.dialogRef.close(); 
    this.fire.selectedUser = new userInterface();
  }
}
