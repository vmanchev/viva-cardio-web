import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";
import { StorageService } from "./shared/storage-service/storage.service";
import { Store } from "@ngrx/store";
import { State } from "./app-store";
import { AddTokenAction, SuccessfullLoginAction } from "./auth/auth-store/actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "cardio-web";

  constructor(
    private translateService: TranslateService,
    private storageService: StorageService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    const defaultLanguage = environment.availableLanguages.filter(
      language => !!language.isDefault
    )[0];
    this.translateService.setDefaultLang(defaultLanguage.code);

    const previousToken = this.storageService.get("token");

    if (previousToken) {
      this.store.dispatch(new AddTokenAction(previousToken));
      this.store.dispatch(new SuccessfullLoginAction());
    }
  }
}
