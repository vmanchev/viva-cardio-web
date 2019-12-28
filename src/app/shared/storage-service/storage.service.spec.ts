import { TestBed } from "@angular/core/testing";

import { StorageService } from "./storage.service";

let store = {};
const mockLocalStorage = {
  getItem: (key: string): string => {
    return key in store ? store[key] : null;
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  }
};

describe("StorageService", () => {
  beforeEach(() => {
    spyOn(localStorage, "getItem").and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, "setItem").and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, "removeItem").and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, "clear").and.callFake(mockLocalStorage.clear);

    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  describe("add", () => {
    it("should add an item to localStorage", () => {
      // ARRANGE
      const service: StorageService = TestBed.get(StorageService);

      // ACT
      service.add("key", "value");

      // ASSEER
      expect(localStorage.getItem("key")).toEqual("value");
    });
  });

  describe("get", () => {
    it("should get an item from localStorage", () => {
      // ARRANGE
      const service: StorageService = TestBed.get(StorageService);
      service.add("key", "value");

      // ASSERT
      expect(service.get("key")).toEqual("value");
    });
  });

  describe("delete", () => {
    it("should delete an item in localStorage", () => {
      // ARRANGE
      const service: StorageService = TestBed.get(StorageService);
      service.add("key", "value");

      // ACT
      service.delete("key");

      // ASSERT
      expect(service.get("key")).toBeNull();
    });
  });
});
