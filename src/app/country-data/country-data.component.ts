import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CountrySummaryData } from '../country-summary-data.model';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { CountryDailyData } from '../country-daily-data.model';

@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.css']
})
export class CountryDataComponent implements OnInit {

  // data
  public country: string;
  public countrySummaryData: CountrySummaryData;
  public countryDailyData: CountryDailyData;

  // pie chart
  public pieChartOptions: ChartOptions = { responsive: true };
  public pieChartLabels: Label[] = ['Dead cases', 'Recovered cases', 'Active cases'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // bar chart 
  public barChartOptions: ChartOptions = { responsive: true };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartDatasets: ChartDataSets[];

  // line chart
  public lineChartOptions: ChartOptions = { responsive: true };
  public lineChartLabels: Label[];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartDatasets: ChartDataSets[];

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
    this.dataProvider.getCountryDailyData(this.getSlug())
    .then((data) => {
      this.countryDailyData = data;
      console.log(this.countryDailyData);
      this.barChartLabels = this.countryDailyData.getWeekChartLabels();
      this.barChartDatasets = this.countryDailyData.getWeekChartData();
      this.lineChartLabels = this.countryDailyData.getLineChartLabels();
      this.lineChartDatasets = this.countryDailyData.getLineChartData();
    });
  }

  public goToWorldwide(): void {
    this.countryService.goToWorldwide();
  }

  public getSlug(): string {
    return this.router.url.slice("/country/".length); //getting rid of /country/ before the country slug
  }
}
