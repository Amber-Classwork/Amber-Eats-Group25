import { Component } from '@angular/core';
import { LoadingService } from './Services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Amber Eats';
  transparent = true;
  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loadingOn();
    this.loadingService.loadingOff();
  }

}
