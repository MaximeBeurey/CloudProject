import { Injectable } from '@angular/core';
import { SummaryData } from './summary-data.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CountrySummaryData } from './country-summary-data.model';
import { DailyData } from './daily-data.model';
import firebase from 'firebase/app';
import { CountryDailyData } from './country-daily-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user.model';
import { News } from './news.model';

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

  private countryDailyData: CountryDailyData;
  private countryDailyDataURL: string = "https://api.covid19api.com/dayone/country/" //and add the slug

  private user: User;
  private canEdit: boolean;

  constructor(private firestore: AngularFirestore, private afAuth : AngularFireAuth) { 
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

  private async getCountryDailyDataLastUpdate(slug: string): Promise<Date> {
    let docRef = this.firestore.collection("CountryData").doc(slug).ref
    return docRef.get().then((doc) => {return doc.data()["Date"].toDate();})
    .catch((error) => {
      // document does not exist
      this.firestore.collection("CountryData").doc(slug).set({Date: new Date("2000-01-1")});  // this way it's not up to date
      return this.getCountryDailyDataLastUpdate(slug); // return the right value (now the doc exists and is not up to date)
    });
  }

  private async isCountryDailyDataUpToDate(slug: string): Promise<boolean> {
    let currentDate = new Date().setHours(0,0,0,0).valueOf();
    return this.getCountryDailyDataLastUpdate(slug).then((date) => { return date.setHours(0,0,0,0).valueOf() === currentDate }) 
  }

  private async updateCountryDailyData(slug: string) {
    if (await this.isCountryDailyDataUpToDate(slug)) {
      // retreive data from firestore
      let content = await this.firestore.collection("CountryData").doc(slug).ref
      .get().then((doc) => {return JSON.parse(JSON.stringify(doc.data()["data"]));});
      this.countryDailyData = new CountryDailyData(content);
    } else {
      // retrive data from the API
      let url = this.countryDailyDataURL + slug
      let data: JSON = await fetch(url, {method: "GET", redirect: "follow"})
      .then(response => response.json()).catch(error => console.log(error));
      this.countryDailyData = new CountryDailyData(data);
      // update firestore database
      this.firestore.collection("CountryData").doc(slug).set({data: this.countryDailyData.data}, {merge: true}); // we don't store data relative to provinces
      this.firestore.collection("CountryData").doc(slug).update({Date: new Date()});
    }
  }

  public async getCountryDailyData(slug: string){
    await this.updateCountryDailyData(slug);
    return this.countryDailyData;
  }

  public async signInWithGoogle(){
    const credentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.user = {
      uid: credentials.user.uid,
      displayName: credentials.user.displayName,
      email: credentials.user.email
    };
    localStorage.setItem("user", JSON.stringify(this.user));
    this.updateUserData();
   }

  private updateUserData(): void{
    this.firestore.collection("users").doc(this.user.uid).set({
    uid: this.user.uid,
    displayName: this.user.displayName,
    email: this.user.email
    },{merge: true});
  }

  public getUser(): User{
    if (this.user == null && this.isUserSignedIn()){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    return this.user;
  }

  public isUserSignedIn(): boolean{
    return JSON.parse(localStorage.getItem("user")) != null;
  }

  public signOut(): void{
    this.afAuth.signOut();
    localStorage.removeItem("user");
    this.user = null;
  }

  public async addNews(news: News){
    this.firestore.collection("news").add({ 
      userName: news.userName,
      date: news.date,
      description: news.description,
      country: news.countrySlug
    });
  }

  public async getNews(){
    const snapshot = await firebase.firestore().collection('news').get()
    return snapshot.docs.map(doc => new News(
        doc.data()["userName"], 
        new Date(doc.data()["date"].toDate()), 
        doc.data()["description"],
        doc.data()["country"]
        )
      );    
  }

}
