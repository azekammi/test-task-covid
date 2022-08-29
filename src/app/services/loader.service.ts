import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  status: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  updateStatus(data: any) {
    this.status.next(data.status)
  }

}
