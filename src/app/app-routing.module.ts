import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoraniComponent } from './components/restorani/restorani.component';
import { HomeComponent } from './components/home/home.component';
import { RestoranDetaljiComponent } from './components/restoran-detalji/restoran-detalji.component';
import { MichelinRestoraniComponent } from './components/michelin-restorani/michelin-restorani.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'main', component: HomeComponent, canActivate: [authGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'restorani', component: RestoraniComponent, canActivate: [authGuard]},
  {path: 'restorani-detalji/:id', component: RestoranDetaljiComponent, canActivate: [authGuard]},
  {path: 'michelin-restorani', component: MichelinRestoraniComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
