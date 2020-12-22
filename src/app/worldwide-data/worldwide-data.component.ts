import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { SummaryData } from '../summary-data.model';
import { DataService } from '../data.service';


@Component({
  selector: 'app-worldwide-data',
  templateUrl: './worldwide-data.component.html',
  styleUrls: ['./worldwide-data.component.css']
})
export class WorldwideDataComponent implements OnInit {

  // data
  public summaryData: SummaryData;
  
  // pie chart
  public pieChartOptions: ChartOptions = { responsive: true };
  public pieChartLabels: Label[] = ['Dead cases', 'Recovered cases', 'Active cases'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dataProvider: DataService) { }

  ngOnInit(): void {
    this.dataProvider.getSummaryData()
    .then((data) => {
                      this.summaryData = data;
                      this.pieChartData = [this.summaryData.getTotalDeaths(),
                                          this.summaryData.getTotalRecovered(),
                                          this.summaryData.getActiveCases()];
                    }
         );
  }

}
