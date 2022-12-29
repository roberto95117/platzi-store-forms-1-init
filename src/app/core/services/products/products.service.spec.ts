import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {

  let httpClient: HttpClient;
  let httpTestingController : HttpTestingController;
  let service : ProductsService;



  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);
  });

  it('should be created', () => {
    //const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });

  describe('test for get all products', () => {

    it('should return products', () => {
      //arrange
      const expectData = [
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
        }
      ];

      //act

      let dataError, dataResponse;

      service.getAllProducts()
      .subscribe( response => {
        dataResponse = response;
      }, error => {
        dataError = error;
      });

      const req = httpTestingController.expectOne(`${environment.url_api}/products`);

      req.flush(expectData);

      //assert
      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });

  });

});
