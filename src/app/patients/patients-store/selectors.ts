import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PatientsState, patientFeatureKey } from './reducers';

const featureSelector = createFeatureSelector<PatientsState>(patientFeatureKey);

export const patientsSelector = createSelector(featureSelector, state => state.patients);