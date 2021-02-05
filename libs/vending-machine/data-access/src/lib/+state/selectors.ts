import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, VENDINGMACHINE_FEATURE_KEY } from './reducer';

const getState = createFeatureSelector<State>(VENDINGMACHINE_FEATURE_KEY);

export const selectLoading = createSelector(
  getState,
  (state: State) => state.loading
);

export const getLoaded = createSelector(
  getState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getState,
  (state: State) => state.loadError
);

export const selectCost = createSelector(
  getState,
  (state: State) => state.cost
);

export const selectStock = createSelector(
  getState,
  (state: State) => state.stock
);

export const selectChange = createSelector(
  getState,
  (state: State) => state.change
);

export const selectPurchasing = createSelector(
  getState,
  (state: State) => state.purchasing
);

export const selectPurchaseSuccess = createSelector(
  getState,
  (state: State) => state.purchaseSuccess
);

export const selectResupply = createSelector(
  getState,
  (state: State) => state.resupply
);
