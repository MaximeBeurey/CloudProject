import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { SummaryData, Line } from '../summary-data.model';
import { DataService } from '../data.service';

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
  
  constructor(private dataProvider: DataService) { }

  ngOnInit(): void {
    this.dataProvider.getSummaryData()
    .then((data) => {
      this.summaryData = data;
      this.countryData = this.summaryData.getCountryData();
    })
  }

}
