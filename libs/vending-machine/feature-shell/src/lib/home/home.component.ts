import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  clearPurchase,
  load,
  purchaseOrder,
  PurchaseOrder,
  reSupply,
  selectChange,
  selectCost,
  selectLoading,
  selectPurchaseSuccess,
  selectPurchasing,
  selectResupply,
  selectStock,
} from '@vanguard/vending-machine/data-access';
import { State } from 'libs/vending-machine/data-access/src/lib/+state/reducers';

@Component({
  selector: 'vg-vending-machine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  loading$ = this.store.pipe(select(selectLoading));
  cost$ = this.store.pipe(select(selectCost));
  stock$ = this.store.pipe(select(selectStock));
  change$ = this.store.pipe(select(selectChange));
  purchasing$ = this.store.pipe(select(selectPurchasing));
  purchaseSuccess$ = this.store.pipe(select(selectPurchaseSuccess));
  resupply$ = this.store.pipe(select(selectResupply));

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.loadState();
  }

  loadState() {
    this.store.dispatch(load());
  }

  onClearPurchase() {
    this.store.dispatch(clearPurchase());
  }

  onPurchase(order: PurchaseOrder) {
    this.store.dispatch(purchaseOrder({ order }));
  }

  onResupply() {
    this.store.dispatch(reSupply({ quantity: 10 }));
  }
}
