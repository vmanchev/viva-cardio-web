import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import * as fromAuth from './auth-store/reducers';
import { authTokenSelector } from './auth-store/selectors';
import { AuthToken } from './auth-store/tokens';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth-store/effects';



@NgModule({
  declarations: [LoginComponent, ForgotComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authStateReducer),
    EffectsModule.forFeature([
      AuthEffects
    ])
  ],
  providers: [
    {
      provide: AuthToken, useFactory: (store) => store.select(authTokenSelector),
      deps: [Store]
  }
  ]
})
export class AuthModule { }
