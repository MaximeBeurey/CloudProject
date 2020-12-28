import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { SummaryData, Line } from '../summary-data.model';
import { DataService } from '../data.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-summary-by-country',
  templateUrl: './summary-by-country.component.html',
  styleUrls: ['./summary-by-country.component.css']
})
export class SummaryByCountryComponent implements OnInit {

  // font awesome icons
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  // summary data
  public summaryData: SummaryData;
  public countryData: Line[];
  
  constructor(private dataProvider: DataService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.dataProvider.getSummaryData()
    .then((data) => {
      this.summaryData = data;
      this.countryData = this.summaryData.getCountryData();
    })
  }

  public sortCountryData(field: number, ascending: boolean): void {
    let order = ascending ? -1 : 1
    this.countryData = this.countryData.sort((a:Line, b:Line) => {
      if (a[field] < b[field]) {
        return order * 1;
      } else if (a[field] > b[field]) {
        return order * -1;
      } else {
        return 0;
      }
    });
  }  

  public goToCountry(country: Line): void {
    this.countryService.navigate(country);
  }

}
