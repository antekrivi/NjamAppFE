import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoraniComponent } from './components/restorani/restorani.component';
import { HomeComponent } from './components/home/home.component';
import { RestoranDetaljiComponent } from './components/restoran-detalji/restoran-detalji.component';
import { MichelinRestoraniComponent } from './components/michelin-restorani/michelin-restorani.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'restorani', component: RestoraniComponent},
  {path: 'restorani-detalji/:id', component: RestoranDetaljiComponent},
  {path: 'michelin-restorani', component: MichelinRestoraniComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
