import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search = new FormControl();
  results : any[]=[];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(300))
      .subscribe((data)=>{
        this.getData(data);
      });
  }

  private getData(query: string) {
    const API = 'HWnA4JyVdB2neDnhQgXFIsWwuuFuZXti';
    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API}&limit=12`)
    .pipe(
      map( (response: any) => {
        return response.data.map(item => item.images.downsized)
      })
    )
    .subscribe((data) => {
      this.results=data;
    })
  }

}
