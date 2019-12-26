import { cold } from "jasmine-marbles";
import { Actions } from "@ngrx/effects";
import { PatientEffects } from "./effects";
import {
  AddPatientAction,
  AddPatientSuccessAction,
  UpdatePatientAction,
  UpdatePatientSuccessAction,
  DeletePatientAction,
  DeletePatientSuccessAction
} from "./actions";
import { of } from "rxjs";

const patientServiceStub = jasmine.createSpyObj("PatientService", [
  "create",
  "update",
  "delete"
]);
const messageServiceStub = jasmine.createSpyObj("MessageService", [
  "success",
  "error"
]);
const routerStub = jasmine.createSpyObj("Router", ["navigate"]);

const patientModelMock = {
  id: 123,
  name: "John Doe"
};

function instantiateEffect(source) {
  const action = new Actions(source);

  return new PatientEffects(
    action,
    patientServiceStub,
    messageServiceStub,
    routerStub
  );
}

describe("PatientEffects", () => {
  describe("addPatient$", () => {
    describe("on success", () => {
      it("should dispatch AddPatientSuccessAction", () => {
        // ARRANGE
        const source = cold("a", {
          a: new AddPatientAction(patientModelMock)
        });
        const effect = instantiateEffect(source);
        patientServiceStub.create.and.returnValue(of({}));

        // ASSERT
        const expected = cold("a", {
          a: new AddPatientSuccessAction()
        });
        expect(effect.addPatient$).toBeObservable(expected);
      });
    });
  });

  describe("updatePatient$", () => {
    describe("on success", () => {
      it("should dispatch UpdatePatientSuccessAction", () => {
        // ARRANGE
        const source = cold("a", {
          a: new UpdatePatientAction(patientModelMock)
        });
        const effect = instantiateEffect(source);
        patientServiceStub.update.and.returnValue(of({}));

        // ASSERT
        const expected = cold("a", {
          a: new UpdatePatientSuccessAction()
        });
        expect(effect.updatePatient$).toBeObservable(expected);
      });
    });
  });

  describe("deletePatient$", () => {
    describe("on success", () => {
      it("should dispatch DeletePatientSuccessAction", () => {
        // ARRANGE
        const source = cold("a", {
          a: new DeletePatientAction(patientModelMock.id)
        });
        const effect = instantiateEffect(source);
        patientServiceStub.delete.and.returnValue(of({}));

        // ASSERT
        const expected = cold("a", {
          a: new DeletePatientSuccessAction()
        });
        expect(effect.deletePatient$).toBeObservable(expected);
      });
    });
  });
  

  describe("addPatientSuccess$", () => {
    it("should show success message for new patient", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new AddPatientSuccessAction()));

      // ACT
      await effect.addPatientSuccess$.subscribe();

      // ASSERT
      expect(messageServiceStub.success).toHaveBeenCalledWith(
        "MESSAGE.SUCCESS_ADD_PATIENT"
      );
      expect(routerStub.navigate).toHaveBeenCalledWith(["/patients"]);
    });
  });

  describe("updatePatientSuccess$", () => {
    it("should show success message for updated patient", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new UpdatePatientSuccessAction()));

      // ACT
      await effect.updatePatientSuccess$.subscribe();

      // ASSERT
      expect(messageServiceStub.success).toHaveBeenCalledWith(
        "MESSAGE.SUCCESS_UPDATE_PATIENT"
      );
      expect(routerStub.navigate).toHaveBeenCalledWith(["/patients"]);
    });
  });

  describe("deletePatientSuccess$", () => {
    it("should show success message for updated patient", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new DeletePatientSuccessAction()));

      // ACT
      await effect.deletePatientSuccess$.subscribe();

      // ASSERT
      expect(messageServiceStub.success).toHaveBeenCalledWith(
        "MESSAGE.SUCCESS_DELETE_PATIENT"
      );
    });
  });
});
