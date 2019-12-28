import { cold } from "jasmine-marbles";
import { Actions } from "@ngrx/effects";
import { PatientEffects } from "./effects";
import {
  AddPatientAction,
  AddPatientSuccessAction,
  UpdatePatientAction,
  UpdatePatientSuccessAction,
  DeletePatientAction,
  DeletePatientSuccessAction,
  FetchPatientsAction,
  StoreBulkPatientsAction,
  CloseModalAction
} from "./actions";
import { of } from "rxjs";

const patientServiceStub = jasmine.createSpyObj("PatientService", [
  "create",
  "update",
  "delete",
  "search"
]);
const messageServiceStub = jasmine.createSpyObj("MessageService", [
  "success",
  "error"
]);
const routerStub = jasmine.createSpyObj("Router", ["navigate"]);

const patientModelMock = {
  id: "123",
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
        patientServiceStub.create.and.returnValue(of(patientModelMock));

        // ASSERT
        const expected = cold("(ab)", {
          a: new AddPatientSuccessAction(patientModelMock),
          b: new CloseModalAction(true)
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
        patientServiceStub.update.and.returnValue(of(patientModelMock));

        // ASSERT
        const expected = cold("(ab)", {
          a: new UpdatePatientSuccessAction(patientModelMock),
          b: new CloseModalAction(true)
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
        const expected = cold("(ab)", {
          a: new DeletePatientSuccessAction(patientModelMock.id),
          b: new CloseModalAction(true)
        });
        expect(effect.deletePatient$).toBeObservable(expected);
      });
    });
  });

  describe("addPatientSuccess$", () => {
    it("should show success message for new patient", async () => {
      // ARRANGE
      const effect = instantiateEffect(
        of(new AddPatientSuccessAction(patientModelMock))
      );

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
      const effect = instantiateEffect(
        of(new UpdatePatientSuccessAction(patientModelMock))
      );

      // ACT
      await effect.updatePatientSuccess$.subscribe();

      // ASSERT
      expect(messageServiceStub.success).toHaveBeenCalledWith(
        "MESSAGE.SUCCESS_UPDATE_PATIENT"
      );
    });
  });

  describe("deletePatientSuccess$", () => {
    it("should show success message for updated patient", async () => {
      // ARRANGE
      const effect = instantiateEffect(of(new DeletePatientSuccessAction(patientModelMock.id)));

      // ACT
      await effect.deletePatientSuccess$.subscribe();

      // ASSERT
      expect(messageServiceStub.success).toHaveBeenCalledWith(
        "MESSAGE.SUCCESS_DELETE_PATIENT"
      );
    });
  });

  describe("fetchPatients$", () => {
    it("should use patientService search method", async () => {
      // ARRANGE
      patientServiceStub.search.and.returnValue(
        of({ patients: [patientModelMock] })
      );
      const effect = instantiateEffect(of(new FetchPatientsAction()));

      // ACT
      await effect.fetchPatients$.subscribe();

      // ASSERT
      expect(patientServiceStub.search).toHaveBeenCalled();
    });

    it("should propagate the result using StoreBulkPatientsAction", () => {
      // ARRANGE
      patientServiceStub.search.and.returnValue(
        of({ patients: [patientModelMock] })
      );
      const source = cold("a", {
        a: new FetchPatientsAction()
      });
      const effect = instantiateEffect(source);

      // ASSERT
      const expected = cold("a", {
        a: new StoreBulkPatientsAction([patientModelMock])
      });
      expect(effect.fetchPatients$).toBeObservable(expected);
    });
  });
});
