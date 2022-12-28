import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';
import { switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;
  productObj : Product;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    //nomal
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      // this.product = this.productsService.getProduct(id);
    });

    //con pipe
    this.route.params
    .pipe(
      switchMap((params : Params) => {
        return this.productsService.getProduct(params.id);
      })
    ).subscribe((product) => {
      this.productObj = product;
    });

    //con pipe y observable
    this.product$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.productsService.getProduct(params.id);
      })
    );
  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id)
    .subscribe(product => {
      this.productObj = product;
    });
  }

  createProduct() {
    const newProduct: Product = {
      _id: 222,
      name: 'nuevo desde angular',
      image: 'assets/images/banner-1.jpg',
      price: 3000,
      description: 'nuevo producto'
    };
    this.productsService.createProduct(newProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 555555,
      description: 'edicion titulo'
    };
    this.productsService.updateProduct('2', updateProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  deleteProduct() {
    this.productsService.deleteProduct('222')
    .subscribe(rta => {
      console.log(rta);
    });
  }

}
