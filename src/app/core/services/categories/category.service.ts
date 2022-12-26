import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category} from './../../models/category.model'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<Category[]>(`${environment.url_api}/categories`);
  }

  getCategory(id: string){
    return this.http.get<Category>(`${environment.url_api}/categories/${id}`);
  }

  create(data : Partial<Category>){
    return this.http.post<Category>(`${environment.url_api}/categories`, data);
  }

  update(id: string, data : Partial<Category>){
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, data);
  }

  delete(id: any){
    return this.http.delete(`${environment.url_api}/categories/${id}`);
  }

  checkCategory(name : string){
    return this.http.post(`${environment.url_api}/categories/availability`, {name});
  }


}
