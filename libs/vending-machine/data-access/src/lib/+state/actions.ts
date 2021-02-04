import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BaseState, PurchaseOrder } from '../models';

export const load = createAction('[VendingMachine] Load');

export const loadSuccess = createAction(
  '[VendingMachine] Load Success',
  props<{ baseState: BaseState }>()
);

export const loadFailure = createAction(
  '[VendingMachine] Load Failure',
  props<{ error: HttpErrorResponse | Error }>()
);

export const clearPurchase = createAction('[VendingMachine] Clear Purchase');

export const purchaseOrder = createAction(
  '[VendingMachine] Purchase',
  props<{ order: PurchaseOrder }>()
);

export const purchaseSuccess = createAction(
  '[VendingMachine] Purchase Success',
  props<{ change: number; quantity: number }>()
);

export const purchaseFailure = createAction(
  '[VendingMachine] Purchase Failure',
  props<{ error: HttpErrorResponse | Error }>()
);

export const reSupply = createAction(
  '[VendingMachine] Resupply',
  props<{ quantity: number }>()
);
