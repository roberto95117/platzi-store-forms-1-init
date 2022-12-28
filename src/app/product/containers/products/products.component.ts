import { Component, OnInit } from '@angular/core';

import { Product } from '@core/models/product.model';
import { ProductsService } from '@core/services/products/products.service';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchProducts();
    this.getRandomUsers();
    this.getFile();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.productsService.getAllProducts()
    .subscribe(products => {
      this.products = products;
    });
  }

  getRandomUsers(){
    this.productsService.getRandom()
    .subscribe((res) => {
      console.log(res);
    },
    error => {
      console.error(error);
    }
    );
  }

  getFile(){
    this.productsService.getFile()
    .subscribe((content) =>{
      console.log(content);
      var blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(blob, 'archivo.txt');
    });
  }

}
