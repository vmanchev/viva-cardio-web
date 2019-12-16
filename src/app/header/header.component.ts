import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  public availableLanguages = environment.availableLanguages;

  constructor(
    private translateService: TranslateService
  ) {}

  setLanguage(language: any): void {
    this.translateService.use(language.code);
  }
}
