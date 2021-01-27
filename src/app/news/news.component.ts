import { Component, OnInit } from '@angular/core';
import { Country } from '../country.model';
import { DataService } from '../data.service';
import { News } from '../news.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public countries: Country[];
  public country;
  public description;
  public news: News[];
  private slug = this.getSlug();

  constructor(public dataProvider: DataService, public router: Router) { }

  ngOnInit(): void {
    this.dataProvider.getSummaryData().then(data => {
      this.countries = data.getAllCountriesNames();
    });
    this.dataProvider.getNews().then(data => this.news = this.select(data, this.slug));
  }

  public addNews(){
    console.log("Sending News to Firebase :)")
    let userName = this.dataProvider.getUser().displayName;
    let news = new News(userName, new Date(), this.description, this.country);
    this.dataProvider.addNews(news);
  }

  public getCountryName(slug: string): string {
    if (slug == "worldwide") {
      return "Worldwide";
    } else {
      for (let c of this.countries) {
        if (c.slug == slug) {
          return c.name;
        }
      }
      return "Error";
    }
  }

  public getSlug(): string {
    let url = this.router.url.slice(1);
    if (url.startsWith("worldwide")) {
      return "worldwide"
    } else {
      url = url.slice("country/".length);
      console.log(url);
      return url;
    }
  }

  private select(data: News[], slug: string): News[] {
    if (slug == "worldwide"){
      return data;
    }
    let ret: News[] = [];
    for (let n of data){
      if (n.countrySlug == slug) {
        ret.push(n);
      }
    }
    return ret;
  }

}
