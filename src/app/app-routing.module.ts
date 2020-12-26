import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldwideDataComponent } from './worldwide-data/worldwide-data.component';
import { CountryDataComponent } from './country-data/country-data.component';

const routes: Routes = [
  {path: "worldwide", component: WorldwideDataComponent},
  {path: "country", children: [
    {path: "**", component: CountryDataComponent} 
  ]},
  {path: "", pathMatch: "full", redirectTo: "worldwide"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
