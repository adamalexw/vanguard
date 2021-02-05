import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseState, PurchaseOrder } from './models';

@Injectable()
export class VendingMachineService {
  /**
   * This could be set in the intial state but I'm doing it here to demonstrate ngTemplate on the feature component
   */
  load(): Observable<BaseState> {
    return of({ stock: 1, cost: 1.2 });
  }

  purchase(order: PurchaseOrder, cost: number): Observable<number> {
    return of(order.funds - order.quantity * cost);
  }
}
