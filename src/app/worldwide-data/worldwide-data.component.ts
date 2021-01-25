import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, Color } from 'ng2-charts';
import { SummaryData } from '../summary-data.model';
import { DataService } from '../data.service';
import { DailyData } from '../daily-data.model';


@Component({
  selector: 'app-worldwide-data',
  templateUrl: './worldwide-data.component.html',
  styleUrls: ['./worldwide-data.component.css']
})
export class WorldwideDataComponent implements OnInit {

  // data
  public summaryData: SummaryData;
  public dailyData: DailyData;
  public totalData: DailyData;

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

  constructor(private dataProvider: DataService) { }

  ngOnInit(): void {
    // summary data
    this.dataProvider.getSummaryData()
    .then((data) => {
                      this.summaryData = data;
                      this.pieChartData = [this.summaryData.getTotalDeaths(),
                                          this.summaryData.getTotalRecovered(),
                                          this.summaryData.getActiveCases()];
                    }
         );
    // daily data
    this.dataProvider.getDailyData()
    .then((data) => {
                      this.dailyData = data;
                      this.barChartLabels = this.dailyData.getChartLabel();
                      this.barChartDatasets = this.dailyData.getChartData();
    });
    // total data
    this.dataProvider.getTotalData()
    .then((data) => {
                      this.totalData = data;
                      this.lineChartLabels = this.totalData.getChartLabel();
                      this.lineChartDatasets = this.totalData.getChartData();
    });
  }

}
