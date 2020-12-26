import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Line } from './summary-data.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(public router: Router) { }

  public navigate(country: Line) {
    this.router.navigate(["country/"+country[1]]);
  }

  public goToWorldwide(): void {
    this.router.navigate(["worldwide"]);
  }
}
