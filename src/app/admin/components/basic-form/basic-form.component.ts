import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  //tiene 3 parametros de entrada por defecto
  //valor inicial, validacioens sincronas, validaciones asincronas
  
  
  formulario: FormGroup;
  

  texto1 : string;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
     this.nameField.valueChanges.subscribe((value)=>{
      this.texto1=value;
      //console.log(value)
    });
    this.formulario.valueChanges.subscribe((value)=>{
     // console.log(value)
    })
  }

  private buildForm(){
    this.formulario = this.formBuilder.group({
      fullName: this.formBuilder.group({//un formulario dentro de otro
        name: ['',[Validators.required,Validators.maxLength(10),Validators.pattern(/^[a-zA-Z ]+$/)]],
        last: ['',[Validators.required,Validators.maxLength(10),Validators.pattern(/^[a-zA-Z ]+$/)]]
      }),
      nameField2 : ['',[Validators.required,Validators.email]],
      nameField3 :  [''],
      nameField4 :  [''],
      nameField5 :  ['',[Validators.required, Validators.min(18), Validators.max(100)]],
      nameField6 :  [''],
      categoyField :  ['categori3'],
      tagField :  [''],
      agreeField :  [false],
      genderField :  [''],
      zoneField : ['']
    });
  }

  get nameField(){
    return this.formulario.get("fullName").get('name');
  }

  get lastField(){
    return this.formulario.get("fullName.last");
  }

  get nameField2(){
    return this.formulario.get("nameField2")
  }

  get nameField3(){
    return this.formulario.get("nameField3")
  }

  get nameField4(){
    return this.formulario.get("nameField4")
  }

  get nameField5(){
    return this.formulario.get("nameField5")
  }

  get nameField6(){
    return this.formulario.get("nameField6")
  }

  get categoyField(){
    return this.formulario.get("categoyField")
  }

  get tagField(){
    return this.formulario.get("tagField")
  }

  get agreeField(){
    return this.formulario.get("agreeField")
  }

  get genderField(){
    return this.formulario.get("genderField")
  }

  get zoneField(){
    return this.formulario.get("zoneField")
  }

  getnameFieldValue(){
    console.log(this.nameField.value);
  }

  isNameFieldValid(){
    return this.nameField.touched && this.nameField.valid;
  }

  isNameFieldInValid(){
    return this.nameField.touched && this.nameField.invalid;
  }

  isLastFieldValid(){
    return this.lastField.touched && this.lastField.valid;
  }

  isLastFieldInValid(){
    return this.lastField.touched && this.lastField.invalid;
  }

  isNameFieldValid2(){
    return this.nameField2.touched && this.nameField2.valid;
  }


  isNameFieldInValid2(){
    return this.nameField2.touched && this.nameField2.invalid;
  }

  isNameFieldValid5(){
    return this.nameField5.touched && this.nameField5.valid;
  }


  isNameFieldInValid5(){
    return this.nameField5.touched && this.nameField5.invalid;
  }

  salvar(){
    if(this.formulario.valid){
      console.log(this.formulario.value);
    }else{
      this.formulario.markAllAsTouched();
    }

  }

}
