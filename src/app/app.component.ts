import { NavigationEnd, Router } from '@angular/router';
import { Component, PLATFORM_ID, Inject} from '@angular/core';
import { filter} from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
declare var gtag;
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private roter: Router,
    @Inject(PLATFORM_ID) private platFormId: Object
  ){

    if(isPlatformBrowser(this.platFormId)){
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

}
