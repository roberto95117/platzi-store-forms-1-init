import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from 'src/app/utils/validators';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['',[Validators.required]],
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]]
    },{
      validators: MyValidators.matchPassword
    });

    this.typeField.valueChanges
    .subscribe(value =>{
      if(value === 'company'){
        this.CompanyField.setValidators([Validators.required]);
      }else{
        this.CompanyField.setValidators(null);
      }
      this.CompanyField.updateValueAndValidity();
    });
  }




  get typeField(){
    return this.form.get('type');
  }

  get CompanyField(){
    return this.form.get('companyName');
  }





}
