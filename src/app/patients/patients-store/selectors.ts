import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PatientsState, patientFeatureKey } from './reducers';

const featureSelector = createFeatureSelector<PatientsState>(patientFeatureKey);

export const patientsSelector = createSelector(featureSelector, state => state.items);
export const closeModalSelector = createSelector(featureSelector, state => state.closeModal);