import { map, catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from './../../models/product.model';

import { environment } from './../../../../environments/environment';
import { Observable, throwError } from 'rxjs';

import * as Sentry from "@sentry/angular";

interface User {
  email: string;
  gender: string;
  phone: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  products: Product[]  =[{
    _id: 1,
    name: 'camisa 1',
    image: 'assets/images/t1.jpg',
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae leo nibh. Nunc eget dolor id metus pharetra maximus eu at lacus. Sed eu accumsan purus. Sed ut tortor non velit accumsan efficitur. Ut rhoncus auctor quam posuere sollicitudin. In tempus dictum tellus sed mattis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus aliquam orci ac dui dictum, malesuada ornare eros efficitur. Fusce in est et lectus interdum placerat. Praesent vitae lacus arcu. Morbi non magna sit amet purus faucibus suscipit.
    `,
    price: 12.22
  },
  {
    _id: 2,
    name: 'camisa 2',
    image: 'assets/images/t2.jpg',
    description: `
    Nullam justo mauris, volutpat id dolor vel, bibendum scelerisque urna. Morbi ullamcorper sapien nec metus imperdiet, vel pretium diam dignissim. Curabitur non felis viverra, venenatis diam vitae, posuere felis. Nunc non euismod arcu. Aliquam odio leo, fermentum eget rutrum sit amet, accumsan eu tortor. In accumsan lectus porttitor, gravida nisl suscipit, mollis nunc. Proin sollicitudin turpis erat, vitae placerat dolor posuere non. Aenean quis lacus ac lorem vestibulum efficitur. Vestibulum eget vestibulum mauris. Suspendisse eleifend fermentum fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    `,
    price: 22.22
  },
  {
    _id: 3,
    name: 'camisa 3',
    image: 'assets/images/t3.jpg',
    description: `
    Duis sit amet tempus massa. In hac habitasse platea dictumst. Nullam sit amet orci magna. Cras aliquet dui non augue pulvinar egestas. Aliquam in efficitur ipsum. Fusce vestibulum tellus at fermentum lacinia. Ut sodales sit amet sem ac cursus. Sed interdum tristique sem, sit amet faucibus sapien fermentum in.
    `,
    price: 22.22
  },
  {
    _id: 4,
    name: 'camisa 4',
    image: 'assets/images/t4.jpg',
    description: `
    Praesent blandit quis purus et consectetur. Praesent vel tortor dapibus orci vulputate congue. Donec semper ante at ligula sagittis, vitae feugiat lectus auctor. Etiam molestie lacus vitae est tincidunt iaculis. In venenatis condimentum auctor. Cras luctus ligula ac maximus vulputate. Curabitur efficitur turpis et eros egestas lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam a nunc dolor. Nulla mi lectus, laoreet at leo et, eleifend tempus nisl. Duis id tempus tellus. Suspendisse congue nisl id fermentum posuere. Donec iaculis nisl vel magna mattis, a blandit ante sodales. Fusce pulvinar arcu a pulvinar varius. Nullam vel nibh ac orci elementum sollicitudin.
    `,
    price: 22.22
  },
  {
    _id: 5,
    name: 'camisa 5',
    image: 'assets/images/t5.jpg',
    description: `
    Etiam sit amet nisi non nisi iaculis fringilla non sit amet dolor. Cras ac sapien et nunc commodo hendrerit in in turpis. Praesent et hendrerit tellus, eu dictum metus. Donec consectetur egestas massa quis maximus. Fusce diam lacus, molestie quis nisl ut, fringilla rutrum est. Ut nec ullamcorper augue. Suspendisse potenti. Proin orci arcu, interdum eget aliquet nec, ultrices eget eros. Nunc est felis, congue et dignissim in, hendrerit nec purus. Nullam efficitur lorem urna, id rutrum risus malesuada id. Praesent posuere leo in cursus sodales. Mauris porttitor eget magna sed aliquam.
    `,
    price: 22.22
  },
  {
    _id: 6,
    name: 'camisa 6',
    image: 'assets/images/t6.jpg',
    description: `
    Vivamus at odio lectus. Duis vehicula neque ac porta viverra. Donec cursus nisi ut leo elementum, sed gravida dui tincidunt. Nulla vitae rutrum nibh. Mauris nec ex id ligula congue auctor et vitae arcu. Fusce massa diam, faucibus quis porttitor id, congue vel erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris mollis sodales convallis. Morbi non urna velit.
    `,
    price: 22.22
  }];

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products`);
    //return this.products;
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }



  getRandom(): Observable<User[]>{
    return this.http.get('https://randomuser.me/api/?results=2')
    .pipe(
/*      catchError(error => {
        return throwError('error al procesar')
      }),*/
      retry(3),
      catchError(this.handleError),
      map((res : any) => res.results as User[])
    );
  }

  private handleError(error : HttpErrorResponse){
    console.log(error);
    Sentry.captureException(error);
    return throwError('algo salio mal');
  }

  getFile(){
    return this.http.get('assets/files/test.txt', {responseType: 'text'});
  }
}
