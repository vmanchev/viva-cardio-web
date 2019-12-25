import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBarService: MatSnackBar,
    private translateService: TranslateService
  ) { }

  success(message: string) {
    this.open(message, 'success');
  }

  error(message: string) {
    this.open(message, 'error');
  }

  private open(message: string, type: string) {
    this.snackBarService.open(this.translateService.instant(message), null, {
      panelClass: `snack__${type}`,
      duration: 2000
    });
  }
}
