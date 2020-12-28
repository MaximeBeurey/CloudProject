import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Line } from './summary-data.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(public router: Router, private dataService: DataService) { }

  public async navigate(country: Line) {
    this.router.navigate(["country/"+country[1]]); //we use the country slug
    
  }

  public goToWorldwide(): void {
    this.router.navigate(["worldwide"]);
  }

}
