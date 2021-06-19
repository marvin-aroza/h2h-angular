import { Component } from '@angular/core';

//services
import { NgxUiLoaderDemoService } from 'src/app/shared/Services/ngx-ui-loader-demo.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helping-hand-admin';

  constructor(
    public loaderService: NgxUiLoaderDemoService
  ) {

  }
}
