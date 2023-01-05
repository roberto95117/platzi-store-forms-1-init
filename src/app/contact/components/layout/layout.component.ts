import { EmployeeData } from './../../../core/models/employee.model';
import { GeneratorService } from './../../../core/services/generator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  salesList : EmployeeData[] = [];
  bList: EmployeeData[] = [];

  names = ['A','B','C','D'];
  constructor(
    private generatorSrv : GeneratorService
  ) { }

  ngOnInit(): void {
    this.salesList = this.generatorSrv.generate(this.names, [10,20], 10);
    this.bList = this.generatorSrv.generate(this.names, [10,20], 10);
  }

  addItem(list : EmployeeData[], label: string){
    list.unshift({
      label : label,
      num : this.generatorSrv.generateNumber([10,20])
    });
  }

}
