import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldwideDataComponent } from './worldwide-data/worldwide-data.component';

const routes: Routes = [
  {path: "worldwide", component: WorldwideDataComponent},
  {path: "", pathMatch: "full", redirectTo: "worldwide"},
  {path: "**", redirectTo: "worldwide"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
