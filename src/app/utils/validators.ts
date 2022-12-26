import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CategoryService } from '../core/services/categories/category.service';

export class MyValidators {


  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static matchPassword(control: AbstractControl){
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if(password === confirmPassword){
      return null;
    }

    return {match_password: true}
  }


  static validateCategory(service: CategoryService){
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checkCategory(value)
      .pipe(
        map((response : any)=> {
          const isAvailable = response.isAvailable;
          if(!isAvailable){
            return {not_available: true};
          }
          return null;
        })
      );
    }
  }

}
