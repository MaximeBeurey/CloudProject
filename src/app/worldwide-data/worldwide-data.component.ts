import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-worldwide-data',
  templateUrl: './worldwide-data.component.html',
  styleUrls: ['./worldwide-data.component.css']
})
export class WorldwideDataComponent implements OnInit {

  // pie chart
  public pieChartOptions: ChartOptions = { responsive: true };
  public pieChartLabels: Label[] = ['Dead cases', 'Recovered cases', 'Active cases'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor() { }

  ngOnInit(): void {
  }

}
