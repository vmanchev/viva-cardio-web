import { TestBed, async, inject } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { AuthToken } from "./auth-store/tokens";

describe("AuthGuard", () => {
  let authTokenMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: AuthToken, useValue: authTokenMock }]
    });
  });

  it("should be created", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
