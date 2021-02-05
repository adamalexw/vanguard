import { Action, createReducer, on } from '@ngrx/store';
import {
  clearPurchase,
  load,
  loadFailure,
  loadSuccess,
  purchaseFailure,
  purchaseOrder,
  purchaseSuccess,
  reSupply,
} from './actions';

export const VENDINGMACHINE_FEATURE_KEY = 'vending-machine';

export interface State {
  loading: boolean;
  loaded: boolean;
  loadError?: Error;
  cost: number;
  stock: number;
  purchasing?: boolean;
  purchaseSuccess?: boolean;
  purchaseError?: Error;
  change?: number;
  resupply?: number;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  cost: 0,
  stock: 1,
};

const vendingMachineReducer = createReducer(
  initialState,
  on(load, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    loadError: undefined,
  })),
  on(loadSuccess, (state, { baseState }) => ({
    ...state,
    ...baseState,
    loaded: true,
    loading: false,
    loadError: undefined,
  })),
  on(loadFailure, (state, { error }) => ({
    ...state,
    loadError: error,
    loading: false,
    loaded: false,
  })),
  on(clearPurchase, (state) => ({
    ...state,
    purchasing: false,
    purchaseSuccess: undefined,
    purchaseError: undefined,
    change: undefined,
    resupply: undefined,
  })),
  on(purchaseOrder, (state) => ({
    ...state,
    purchasing: true,
    purchaseSuccess: false,
    purchaseError: undefined,
    change: undefined,
  })),
  on(purchaseSuccess, (state, { change, quantity }) => ({
    ...state,
    change,
    purchaseSuccess: true,
    purchasing: false,
    purchaseError: undefined,
    stock: state.stock - quantity,
  })),
  on(purchaseFailure, (state, { error }) => ({
    ...state,
    change: undefined,
    purchaseSuccess: false,
    purchasing: false,
    purchaseError: error,
  })),
  on(reSupply, (state, { quantity }) => ({
    ...state,
    stock: quantity,
    resupply: quantity,
    puchasing: false,
    change: undefined,
  }))
);

export function reducer(state: State, action: Action) {
  return vendingMachineReducer(state, action);
}
