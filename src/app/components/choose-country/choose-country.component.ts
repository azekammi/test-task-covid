import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-choose-country',
  templateUrl: './choose-country.component.html',
  styleUrls: ['./choose-country.component.scss']
})
export class ChooseCountryComponent implements OnInit {

  @Output() close = new EventEmitter()
  @Output() selectedCountry = new EventEmitter()
  @Input() countries?: Country[]

  searchText = ""

  constructor(
    config: NgbModalConfig, private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  closePopup() {
    this.close.emit({"close": true})
  }

  chooseButton(countryName: string) {
    this.selectedCountry.emit({"selectedCountry": countryName})
    this.close.emit({"close": true})
  }

}
