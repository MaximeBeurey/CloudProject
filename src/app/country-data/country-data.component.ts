import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.css']
})
export class CountryDataComponent implements OnInit {

  // font awesome icon
  faAngleRight = faAngleRight;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  public goToWorldwide(): void {
    this.countryService.goToWorldwide();
  }
}
