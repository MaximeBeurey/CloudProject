import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { SummaryData } from '../summary-data.model';


@Component({
  selector: 'app-worldwide-data',
  templateUrl: './worldwide-data.component.html',
  styleUrls: ['./worldwide-data.component.css']
})
export class WorldwideDataComponent implements OnInit {

  // summary data
  private summaryDataURL: string = 'https://api.covid19api.com/summary';
  public summaryData: SummaryData;
  
  // pie chart
  public pieChartOptions: ChartOptions = { responsive: true };
  public pieChartLabels: Label[] = ['Dead cases', 'Recovered cases', 'Active cases'];
  public pieChartData: SingleDataSet = [300, 500, 100]
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  public async getData() {
    // TO-DO check if the data is up to date in firestore
    var isUpToDate: Boolean = false;
    if (isUpToDate) {
      console.log("up to date");
      // TO-DO retrieve the JSON file from firestore and create an instance of SummaryData
    } else {
      // Retrieve data from the API
      var data: JSON = await fetch(this.summaryDataURL, {method: "GET", redirect: "follow"})
      .then(response => response.json()).catch(error => console.log(error));
      this.summaryData = new SummaryData(data);
      // TO-DO update firestore database
      console.log(this.summaryData.getData());
    }
  }

  ngOnInit(): void {
    this.getData()
  }

}
