import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  loaderStatus: boolean = false;

  constructor(private loaderService: LoaderService) { 
    
    this.loaderService.status
      .pipe(startWith(false))

    this.loaderService.status
        .subscribe(value => {
          this.loaderStatus = value > 0 ? true : false
        })
  }

}
