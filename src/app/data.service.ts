import { Injectable } from '@angular/core';
import { SummaryData } from './summary-data.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CountrySummaryData } from './country-summary-data.model';
import { DailyData } from './daily-data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private summaryData: SummaryData;
  private summaryDataURL: string = 'https://api.covid19api.com/summary';

  private dailyData: DailyData;
  private dailyDataURL: string = 'https://corona.lmao.ninja/v2/historical/all?lastdays=7'

  private totalData: DailyData;
  private totalDataURL: string = "https://corona.lmao.ninja/v2/historical/all"

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

  public async getCountrySummaryData(countrySlug: string): Promise<CountrySummaryData> {
    if (this.summaryData == null) {
      await this.updateSummaryData();
    }
    return new CountrySummaryData(this.summaryData.getCountrySummaryData(countrySlug));
  }

  private async getDailyDataLastUpdate(): Promise<Date> {
    let docRef = this.firestore.collection("CovidData").doc("DailyData").ref
    return docRef.get().then((doc) => {return doc.data()["Date"].toDate();});
  }

  private async isDailyDataUpToDate(): Promise<boolean> {
    let currentDate = new Date().setHours(0,0,0,0).valueOf();
    return this.getDailyDataLastUpdate().then((date) => {return date.setHours(0,0,0,0).valueOf() === currentDate}) 
  }

  private async updateDailyData() {
    // We check if data in frestore is up to date
    if (await this.isDailyDataUpToDate()) {
      // retreive data from firestore
      let content = await this.firestore.collection("CovidData").doc("DailyData").ref
      .get().then((doc) => {return JSON.parse(JSON.stringify(doc.data()));});
      this.dailyData = new DailyData(content);
    } else {
      // Retreive data from the API
      let data: JSON = await fetch(this.dailyDataURL, {method: "GET", redirect: "follow"})
      .then(response => response.json()).catch(error => console.log(error));
      this.dailyData = new DailyData(data);
      // update firestore database
      this.firestore.collection("CovidData").doc("DailyData").set(data, {merge: true});
      this.firestore.collection("CovidData").doc("DailyData").update({Date: new Date()})
    }
  }

  public async getDailyData() {
    await this.updateDailyData();
    return this.dailyData;
  }

  private async getTotalDataLastUpdate(): Promise<Date> {
    let docRef = this.firestore.collection("CovidData").doc("TotalData").ref
    return docRef.get().then((doc) => {return doc.data()["Date"].toDate();});
  }

  private async isTotalDataUpToDate(): Promise<boolean> {
    let currentDate = new Date().setHours(0,0,0,0).valueOf();
    return this.getTotalDataLastUpdate().then((date) => {return date.setHours(0,0,0,0).valueOf() === currentDate}) 
  }

  private async updateTotalData() {
    // We check if data in frestore is up to date
    if (await this.isTotalDataUpToDate()) {
      // retreive data from firestore
      let content = await this.firestore.collection("CovidData").doc("TotalData").ref
      .get().then((doc) => {return JSON.parse(JSON.stringify(doc.data()));});
      this.totalData = new DailyData(content);
    } else {
      // Retreive data from the API
      let data: JSON = await fetch(this.totalDataURL, {method: "GET", redirect: "follow"})
      .then(response => response.json()).catch(error => console.log(error));
      this.totalData = new DailyData(data);
      // update firestore database
      this.firestore.collection("CovidData").doc("TotalData").set(data, {merge: true});
      this.firestore.collection("CovidData").doc("TotalData").update({Date: new Date()})
    }
  }

  public async getTotalData() {
    await this.updateTotalData();
    return this.totalData;
  }

}
