import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import { VendingMachineService } from '../vending-machine.service';
import {
  load,
  loadFailure,
  loadSuccess,
  purchaseFailure,
  purchaseOrder,
  purchaseSuccess,
} from './actions';
import { State } from './reducers';
import { selectCost } from './selectors';

@Injectable()
export class VendingMachineEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      concatMap(() =>
        this.service.load().pipe(
          map((baseState) => loadSuccess({ baseState })),
          catchError((error) => of(loadFailure({ error })))
        )
      )
    )
  );

  order$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchaseOrder),
      withLatestFrom(this.store.pipe(select(selectCost))),
      concatMap(([{ order }, cost]) =>
        this.service.purchase(order, cost).pipe(
          map((change) =>
            purchaseSuccess({ change, quantity: order.quantity })
          ),
          catchError((error) => of(purchaseFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private service: VendingMachineService
  ) {}
}
