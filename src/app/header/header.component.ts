import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { State } from '../app-store';
import { LogoutAction } from '../auth/auth-store/actions';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  public availableLanguages = environment.availableLanguages;

  constructor(
    private translateService: TranslateService,
    private store: Store<State>
  ) {}

  setLanguage(language: any): void {
    this.translateService.use(language.code);
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}
