import { EmployeeData } from './../../../core/models/employee.model';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  label : string;

  @Input() title: string;
  @Input() data: EmployeeData[]= [];
  @Output() add = new EventEmitter<string>();



  constructor(

  ) { }

  ngOnInit(): void {
  }

  addItem(){
    this.add.emit(this.label);
    this.label = '';
  }

}
