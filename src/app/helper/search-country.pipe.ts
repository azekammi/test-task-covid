import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/country';

@Pipe({
  name: 'searchCountry'
})
export class SearchCountryPipe implements PipeTransform {

  transform(countries: Country[], searchText: string): Country[] {
    searchText = searchText ? searchText.toLocaleLowerCase() : ''
    return searchText ? countries.filter( (country: Country) => country.name.toLocaleLowerCase().indexOf(searchText) !== -1) : countries
  }

}
