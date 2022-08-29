import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CovidService } from '../../services/covid.service';
import { Case } from '../../models/case';
import { Country } from '../../models/country';
import { Vaccine } from '../../models/vaccine';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  selectedCountry = "Azerbaijan"
  countries?: Country[]
  @Input() case?: Case;
  @Input() vaccine?: Vaccine
  @Input() showStatistics = false

  @Output() changedListener = new EventEmitter()

  constructor(
    private covidService: CovidService,
    config: NgbModalConfig, public modalService: NgbModal
  ) { }

  ngOnInit() {
    // CountryList
    this.covidService.getCountries().subscribe(res => {
      this.countries = res
    })

    console.log(this.case, "asas")
  }

  // Change Country
  changedCountry(event: any) {
    if(event.selectedCountry != null) {
      this.selectedCountry = event.selectedCountry
      this.changedListener.emit({"selectedCountry": this.selectedCountry});
    }
  }

  // Popup property
  openPopup(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  closePopup() {
    this.modalService.dismissAll()
  }

}
