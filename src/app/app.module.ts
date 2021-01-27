import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { WorldwideDataComponent } from './worldwide-data/worldwide-data.component';
import { SummaryByCountryComponent } from './summary-by-country/summary-by-country.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryDataComponent } from './country-data/country-data.component';
import { NewsComponent } from './news/news.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WorldwideDataComponent,
    SummaryByCountryComponent,
    CountryDataComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
