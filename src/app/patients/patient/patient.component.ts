import { Component, OnInit } from '@angular/core';
import { PatientFormService } from '../patient-form.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app-store';
import { AddPatientAction } from '../patients-store/actions';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor(
    public formService: PatientFormService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.formService.patientForm.reset();
  }

  formHandler() {
    if (this.formService.patientForm.invalid) {
      return;
    }

    this.store.dispatch(new AddPatientAction(this.formService.patientForm.value));
  }
}
