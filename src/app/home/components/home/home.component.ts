import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import Swiper from 'swiper';

export type myTipo  = 'A' | 'B' | 'C' | 'D';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, AfterViewInit {

  mySwiper: Swiper;

  mostrar: boolean = false;

  nombres: string[] = ['a','b','c','d'];

  tipo: myTipo = 'A';

  emojis = [ '😂' , '🐦', '🐳','🌮', '💚']

  widt: number = 0;
  heigh: number = 0;
  back: string = "";

  constructor(
    @Inject(PLATFORM_ID) private platFormId: Object
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //valida si estoy desde el navegador
    if(isPlatformBrowser(this.platFormId)){
      this.mySwiper = new Swiper('.swiper-container');
    }
//    isPlatformServer

  }

}
