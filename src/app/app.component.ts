import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter} from 'rxjs/operators'
declare var gtag;
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private roter: Router
  ){
    const navEndEvents$ =
    this.roter.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    );

    navEndEvents$
    .subscribe((event : NavigationEnd) => {
      gtag('config', 'MEASUREMENT_ID'),{
        page_path : event.urlAfterRedirects
      }
    });

  }

}
