import { AuthInterceptor } from "./auth.interceptor";
import { Subject, of } from "rxjs";

let token;
const nextHandlerSpy = jasmine.createSpy("handleSpy", request => {});

describe("Auth interceptor", () => {
  it("should not add an access token for new user registration request", () => {
    // ARRANGE
    const interceptor = new AuthInterceptor(of(token));
    const originalRequest = {
      clone: arg => arg,
      method: "POST",
      url: "https://example.org/api/user"
    } as any;

    // ACT
    interceptor.intercept(originalRequest, { handle: nextHandlerSpy } as any);

    // ASSERT
    expect(nextHandlerSpy).toHaveBeenCalledWith(originalRequest);
  });

  it("should not add an access token for login request", () => {
    // ARRANGE
    const interceptor = new AuthInterceptor(of(token));
    const originalRequest = {
      clone: arg => arg,
      method: "POST",
      url: "https://example.org/api/user/login"
    } as any;

    // ACT
    interceptor.intercept(originalRequest, { handle: nextHandlerSpy } as any);

    // ASSERT
    expect(nextHandlerSpy).toHaveBeenCalledWith(originalRequest);
  });

  it("should not add an access token for forgot password request", () => {
    // ARRANGE
    const interceptor = new AuthInterceptor(of(token));
    const originalRequest = {
      clone: arg => arg,
      method: "POST",
      url: "https://example.org/api/user/forgot"
    } as any;

    // ACT
    interceptor.intercept(originalRequest, { handle: nextHandlerSpy } as any);

    // ASSERT
    expect(nextHandlerSpy).toHaveBeenCalledWith(originalRequest);
  });

  it("should add an access token for protected paths", () => {
    // ARRANGE
    const interceptor = new AuthInterceptor(of("qwerty"));
    const originalRequest = {
      clone: arg => arg,
      method: "POST",
      url: "https://example.org/api/patients"
    } as any;

    // ACT
    interceptor.intercept(originalRequest, { handle: nextHandlerSpy } as any);

    // ASSERT
    expect(nextHandlerSpy).toHaveBeenCalledWith({
      setHeaders: { Authorization: "Bearer qwerty" }
    });
  });
});
