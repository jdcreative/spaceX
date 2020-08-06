import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: AngularEditorConfig={
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '5rem',
    width:'auto',
    minWidth:'0',
        
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '3',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',    
        'subscript',
        'superscript',
        'heading',    
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ],   
  };
  formEditor:FormGroup;  
  nota= localStorage.getItem('notas')
  constructor(private fb: FormBuilder) { this.buildForm() }

  ngOnInit() {
    this.formEditor.controls['enteredText'].setValue(this.nota);    
  }
  buildForm(){
    this.formEditor = this.fb.group({
      enteredText:['']
    });
    this.formEditor.valueChanges.subscribe(res=>{
      console.log('texto ingresado: ', res)
      localStorage.setItem('notas', res.enteredText);
    }, err=>{console.error('error al ingresar texto')})
  }

}
