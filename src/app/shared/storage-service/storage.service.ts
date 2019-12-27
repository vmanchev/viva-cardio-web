import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  add(key: string, value: any) {
    window.localStorage.setItem(key, value);
  }

  get(key: string) {
    return window.localStorage.getItem(key);
  }

  delete(key: string) {
    return window.localStorage.removeItem(key);
  }
}
