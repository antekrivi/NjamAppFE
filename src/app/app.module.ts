import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestoraniComponent } from './components/restorani/restorani.component';
import { SortRestoraniPipe } from './pipes/sort-restorani.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { RestoranDetaljiComponent } from './components/restoran-detalji/restoran-detalji.component';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MichelinRestoraniComponent } from './components/michelin-restorani/michelin-restorani.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { KorisnikInfoComponent } from './components/korisnik-info/korisnik-info.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RestoraniComponent,
    SortRestoraniPipe,
    HomeComponent,
    RestoranDetaljiComponent,
    MichelinRestoraniComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    KorisnikInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'hr'
      }
    )

  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient()
    //provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
