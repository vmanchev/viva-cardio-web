import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './reducers';

const featureSelector = createFeatureSelector<AuthState>(authFeatureKey);

export const authTokenSelector = createSelector(featureSelector, state => state.token);