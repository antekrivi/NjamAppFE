import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoraniComponent } from './components/restorani/restorani.component';

const routes: Routes = [
  {path: '', component: RestoraniComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
