import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { EmployeeData } from './../../../core/models/employee.model';
import { GeneratorService } from './../../../core/services/generator.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {



  salesList : EmployeeData[] = [];
  bList: EmployeeData[] = [];

  names = ['A','B','C','D'];

  value : Observable<number>;
  value2 : number;

  sub$ : Subscription;
  constructor(
    private generatorSrv : GeneratorService
  ) {
    this.value = this.generatorSrv.getData()
    .pipe(
      tap(num => console.log(num))
    );
   }

  ngOnInit(): void {
    this.salesList = this.generatorSrv.generate(this.names, [10,20], 10);
    this.bList = this.generatorSrv.generate(this.names, [10,20], 10);
    this.sub$ = this.generatorSrv.getData()
    .subscribe((val) =>{
      this.value2 = val;
      console.log(this.value);
    });
  }

  ngOnDestroy(): void {
      console.log('destroy');
      this.sub$.unsubscribe();
  }

  addItem(list : EmployeeData[], label: string){
    list.unshift({
      label : label,
      num : this.generatorSrv.generateNumber([10,20])
    });
  }

}
