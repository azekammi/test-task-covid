import { Component, Input, OnInit } from '@angular/core';
import { History } from '../../models/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input() history?: History

  constructor() { }

  ngOnInit() {
    
  }

}
