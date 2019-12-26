import { cold } from "jasmine-marbles";
import { Actions } from "@ngrx/effects";
import { AuthEffects } from "./effects";
import {
  RegisterNewUserAction,
  AddTokenAction,
  SuccessfullRegistrationAction,
  SuccessfullLoginAction,
  AuthenticateUserAction,
  FailedLoginAction,
  ForgotPasswordSuccessAction,
  ForgotPasswordFailureAction,
  ForgotPasswordRequestAction
} from "./actions";
import { of, throwError, ReplaySubject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { async } from "@angular/core/testing";

const userServiceStub = jasmine.createSpyObj("UserService", [
  "registration",
  "login",
  "forgot"
]);
const messageServiceStub = jasmine.createSpyObj("MessageService", [
  "success",
  "error"
]);
const routerStub = jasmine.createSpyObj("Router", ["navigate"]);

const userModelMock = {
  email: "test@example.org",
  password: "qwerty"
};

function instantiateEffect(source) {
  const action = new Actions(source);

  return new AuthEffects(
    action,
    userServiceStub,
    messageServiceStub,
    routerStub
  );
}

fdescribe("AuthEffects", () => {
  describe("newUserRegistration$", () => {
    describe("on success", () => {
      it("should dispatch AddTokenAction and SuccessfullRegistrationAction", () => {
        // ARRANGE
        const source = cold("a", {
          a: new RegisterNewUserAction(userModelMock)
        });
        const effect = instantiateEffect(source);
        userServiceStub.registration.and.returnValue(
          of({ token: "accessTokenMock" })
        );

        // ASSERT
        const expected = cold("(ab)", {
          a: new AddTokenAction("accessTokenMock"),
          b: new SuccessfullRegistrationAction()
        });
        expect(effect.newUserRegistration$).toBeObservable(expected);
      });
    });
  });

  describe("authenticateUser$", () => {
    describe("on success", () => {
      it("should dispatch AddTokenAction and SuccessfullLoginAction", () => {
        // ARRANGE
        const source = cold("a", {
          a: new AuthenticateUserAction(userModelMock)
        });
        const effect = instantiateEffect(source);
        userServiceStub.login.and.returnValue(of({ token: "accessTokenMock" }));

        // ASSERT
        const expected = cold("(ab)", {
          a: new AddTokenAction("accessTokenMock"),
          b: new SuccessfullLoginAction()
        });
        expect(effect.authenticateUser$).toBeObservable(expected);
      });
    });

    describe("on error", () => {
      it("should dispatch FailedLoginAction", () => {
        // ARRANGE
        const source = cold("a", {
          a: new AuthenticateUserAction(userModelMock)
        });
        const effect = instantiateEffect(source);
        userServiceStub.login.and.returnValue(
          throwError(new HttpErrorResponse({ status: 404 }))
        );

        // ASSERT
        const expected = cold("a", {
          a: new FailedLoginAction()
        });
        expect(effect.authenticateUser$).toBeObservable(expected);
      });
    });
  });

  describe("forgotPassword$", () => {
    describe("on success", () => {
      it("should dispatch ForgotPasswordSuccessAction", () => {
        // ARRANGE
        const source = cold("a", {
          a: new ForgotPasswordRequestAction(userModelMock)
        });
        const effect = instantiateEffect(source);
        userServiceStub.forgot.and.returnValue(of({}));

        // ASSERT
        const expected = cold("a", {
          a: new ForgotPasswordSuccessAction()
        });
        expect(effect.forgotPassword$).toBeObservable(expected);
      });
    });

    describe("on error", () => {
      it("should dispatch ForgotPasswordFailureAction", () => {
        // ARRANGE
        const source = cold("a", {
          a: new ForgotPasswordRequestAction(userModelMock)
        });
        const effect = instantiateEffect(source);
        userServiceStub.forgot.and.returnValue(
          throwError(new HttpErrorResponse({ status: 404 }))
        );

        // ASSERT
        const expected = cold("a", {
          a: new ForgotPasswordFailureAction()
        });
        expect(effect.forgotPassword$).toBeObservable(expected);
      });
    });
  });

  describe("successfullRegistration$", () => {
    it("should show success registration message", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new SuccessfullRegistrationAction()));

      // ACT
      await effect.successfullRegistration$.subscribe();

      // ASSERT
      expect(messageServiceStub.success).toHaveBeenCalledWith(
        "MESSAGE.SUCCESS_REGISTRATION"
      );
    });

    it("should redirect the user to /patients", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new SuccessfullRegistrationAction()));

      // ACT
      await effect.successfullRegistration$.subscribe();

      // ASSERT
      expect(routerStub.navigate).toHaveBeenCalledWith(["/patients"]);
    });
  });

  describe("successfullLogin$", () => {
    it("should show success login message", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new SuccessfullLoginAction()));

      // ACT
      await effect.successfullLogin$.subscribe();

      // ASSERT
      expect(messageServiceStub.success).toHaveBeenCalledWith(
        "MESSAGE.SUCCESS_LOGIN"
      );
    });

    it("should redirect the user to /patients", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new SuccessfullLoginAction()));

      // ACT
      await effect.successfullLogin$.subscribe();

      // ASSERT
      expect(routerStub.navigate).toHaveBeenCalledWith(["/patients"]);
    });
  });

  describe("failedLogin$", () => {
    it("should show error login message", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new FailedLoginAction()));

      // ACT
      await effect.failedLogin$.subscribe();

      // ASSERT
      expect(messageServiceStub.error).toHaveBeenCalledWith(
        "MESSAGE.ERROR_LOGIN"
      );
    });
  });

  describe("forgotPasswordSuccess$", () => {
    it("should show forgot password success message", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new ForgotPasswordSuccessAction()));

      // ACT
      await effect.forgotPasswordSuccess$.subscribe();

      // ASSERT
      expect(messageServiceStub.success).toHaveBeenCalledWith(
        "MESSAGE.SUCCESS_FORGOT"
      );
    });

    it("should redirect the user to /login", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new ForgotPasswordSuccessAction()));

      // ACT
      await effect.forgotPasswordSuccess$.subscribe();

      // ASSERT
      expect(routerStub.navigate).toHaveBeenCalledWith(["/login"]);
    });
  });

  describe("forgotPasswordFailure$", () => {
    it("should show forgot password error message", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new ForgotPasswordFailureAction()));

      // ACT
      await effect.forgotPasswordFailure$.subscribe();

      // ASSERT
      expect(messageServiceStub.error).toHaveBeenCalledWith(
        "MESSAGE.ERROR_FORGOT"
      );
    });
  });
});
