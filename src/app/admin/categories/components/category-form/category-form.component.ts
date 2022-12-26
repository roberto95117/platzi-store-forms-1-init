import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';

import { MyValidators } from 'src/app/utils/validators';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {


  form: FormGroup;
  categoriId: string = "";
  isNew : boolean = true;
  @Input() set category (data: Category){
    if(data){
      this.form.patchValue(data);
      this.isNew= false;
    }
  }
  @Output() crate = new EventEmitter();
  @Output() update = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }


  buildForm(){
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      //name: ['',[Validators.required,MyValidators.validateCategory(this.service)]], comento porque no me jalo la validacion async :v
      image: ['',Validators.required]
    });
  }

  get nameField(){
    return this.form.get('name');
  }

  get imageField(){
    return this.form.get('image');
  }

  save(){
    if(this.form.valid){
      if(!this.isNew){
        this.update.emit(this.form.value);
      }else{
        this.crate.emit(this.form.value);
      }
    }else{
      this.form.markAllAsTouched();
    }
  }




}
