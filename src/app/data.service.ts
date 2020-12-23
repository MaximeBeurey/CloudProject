import { Injectable } from '@angular/core';
import { SummaryData } from './summary-data.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private summaryData: SummaryData;
  private summaryDataURL: string = 'https://api.covid19api.com/summary';

  constructor(private firestore: AngularFirestore) { 
  }

  private toDate(date: string): Date {
    return new Date(date);
  }

  private async getSummaryDataLastUpdate(): Promise<Date> {
    let docRef = this.firestore.collection("CovidData").doc("SummaryData").ref
    return docRef.get().then((doc) => {return this.toDate(doc.data()["Date"]);})
  }

  private async isSummaryDataUpToDate(): Promise<boolean> {
     let currentDate = new Date().setHours(0,0,0,0).valueOf();
     return this.getSummaryDataLastUpdate().then((date) => {return date.setHours(0,0,0,0).valueOf() === currentDate}) 
  }

  private async updateSummaryData() {
    // We check if the data in firestore is up to date
    if (await this.isSummaryDataUpToDate()) {
      // retrive data from firestore
      let content = await this.firestore.collection("CovidData").doc("SummaryData").ref
      .get().then((doc) => {return JSON.parse(JSON.stringify(doc.data()));});
      this.summaryData = new SummaryData(content);
    } else {
      // Retrieve data from the API
      let data: JSON = await fetch(this.summaryDataURL, {method: "GET", redirect: "follow"})
      .then(response => response.json()).catch(error => console.log(error));
      this.summaryData = new SummaryData(data);
      // update firestore database
      this.firestore.collection("CovidData").doc("SummaryData").set(data, {merge: true});
    }
  }

  public async getSummaryData() {
    await this.updateSummaryData();
    return this.summaryData;
  }

}
