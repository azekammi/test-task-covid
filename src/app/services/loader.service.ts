import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  status: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  increaseStatus(){
    this.status.next(this.status.value + 1)
  }

  decreaseStatus(){
    this.status.next(this.status.value > 0 ? this.status.value - 1 : 0)
  }

}
