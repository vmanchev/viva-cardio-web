import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BloodPressureModule } from './blood-pressure/blood-pressure.module';
import { BloodPressureRoutingModule } from './blood-pressure/blood-pressure-routing.module';
import { PatientsModule } from './patients/patients.module';
import { PatientsRoutingModule } from './patients/patients-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './app-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BloodPressureRoutingModule,
    BloodPressureModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    PatientsModule,
    PatientsRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
