import { Injectable } from '@angular/core';
import { SummaryData } from './summary-data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private summaryData: SummaryData;
  private summaryDataURL: string = 'https://api.covid19api.com/summary';

  constructor() { 
  }

  private async updateData() {
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
    }
  }

  public async getSummaryData() {
    await this.updateData();
    return this.summaryData;
  }

}
