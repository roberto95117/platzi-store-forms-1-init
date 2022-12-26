import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/categories/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private service: CategoryService,
    private rotue: Router,
    private actRoute: ActivatedRoute
  ) { }

  category : Category;

  ngOnInit(): void {
    this.actRoute.params.subscribe((params : Params)=>{
      if(params.id){
        this.getCategory(params.id);
      }
    });
  }

  createCategory(data){
    this.service.create(data)
    .subscribe(res=>{
      this.rotue.navigate(['./admin/categories']);
    })
  }

  updateCategory(data){
    this.service.update(this.category._id,data)
      .subscribe((data)=>{
        this.rotue.navigate(['/admin/categories']);
      });
  }

  private getCategory(id: any){
    this.service.getCategory(id)
      .subscribe((data)=>{
        this.category= data;
      });
  }


}
