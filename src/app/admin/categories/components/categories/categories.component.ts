import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/categories/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getAll()
    .subscribe(categories => {
      this.categories = categories;
    });
  }

  delete(id: any){
    console.log(id);
    this.categoryService.delete(id)
    .subscribe(data=>{
      this.fetchCategories();
    })
  }

}
