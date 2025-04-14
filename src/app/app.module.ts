import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestoraniComponent } from './components/restorani/restorani.component';
import { SortRestoraniPipe } from './pipes/sort-restorani.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { RestoranDetaljiComponent } from './components/restoran-detalji/restoran-detalji.component';
import { provideHttpClient } from '@angular/common/http';
import { MichelinRestoraniComponent } from './components/michelin-restorani/michelin-restorani.component';

@NgModule({
  declarations: [
    AppComponent,
    RestoraniComponent,
    SortRestoraniPipe,
    HomeComponent,
    RestoranDetaljiComponent,
    MichelinRestoraniComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
