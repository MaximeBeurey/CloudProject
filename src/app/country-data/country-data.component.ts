import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CountrySummaryData } from '../country-summary-data.model';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.css']
})
export class CountryDataComponent implements OnInit {

  // data
  public country: string;
  public countrySummaryData: CountrySummaryData;

  // pie chart
  public pieChartOptions: ChartOptions = { responsive: true };
  public pieChartLabels: Label[] = ['Dead cases', 'Recovered cases', 'Active cases'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor(private countryService: CountryService, private dataProvider: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataProvider.getCountrySummaryData(this.getSlug())
    .then((data) => {
      this.countrySummaryData = data;
      if (this.countrySummaryData.data != null) {
      this.country = this.countrySummaryData.getCountry()
      this.pieChartData = [
        this.countrySummaryData.getTotalDeaths(),
        this.countrySummaryData.getTotalRecovered(),
        this.countrySummaryData.getActiveCases()
      ];
      } else {
        this.country = "Not found"
      }
    });
  }

  public goToWorldwide(): void {
    this.countryService.goToWorldwide();
  }

  public getSlug(): string {
    return this.router.url.slice("/country/".length); //getting rid of /country/ before the country slug
  }
}
