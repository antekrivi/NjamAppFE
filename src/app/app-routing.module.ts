import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoraniComponent } from './components/restorani/restorani.component';
import { HomeComponent } from './components/home/home.component';
import { RestoranDetaljiComponent } from './components/restoran-detalji/restoran-detalji.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'restorani', component: RestoraniComponent},
  {path: 'restorani-detalji/:id', component: RestoranDetaljiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
