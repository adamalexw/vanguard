import { subscribeSpyTo } from '@hirez_io/observer-spy';
import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { BaseState, PurchaseOrder } from '../models';
import { VendingMachineService } from '../vending-machine.service';
import { load, loadSuccess, purchaseOrder, purchaseSuccess } from './actions';
import { VendingMachineEffects } from './effects';
import { initialState, State } from './reducer';
import { selectCost } from './selectors';

describe('VendingMachineEffects', () => {
  let actions$: Observable<unknown>;

  let spectator: SpectatorService<VendingMachineEffects>;

  const createService = createServiceFactory({
    service: VendingMachineEffects,
    providers: [
      provideMockActions(() => actions$),
      provideMockStore({ initialState }),
    ],
    mocks: [VendingMachineService],
  });

  let service: SpyObject<VendingMachineService>;
  let store: SpyObject<MockStore<State>>;

  beforeEach(() => {
    spectator = createService();
    actions$ = spectator.inject(Actions);
    service = spectator.inject(VendingMachineService);
    store = spectator.inject(MockStore);
  });

  describe('load$', () => {
    it('should call service and load base state', () => {
      actions$ = of(load());
      const baseState: BaseState = { stock: 1, cost: 1.2 };

      service.load.mockReturnValue(of(baseState));

      const effectSpy = subscribeSpyTo(spectator.service.load$);

      expect(effectSpy.getLastValue()).toEqual(loadSuccess({ baseState }));
    });
  });

  describe('order$', () => {
    it('should call service and perform purchase', () => {
      const quantity = 1;
      const order: PurchaseOrder = { quantity, funds: 2 };
      actions$ = of(purchaseOrder({ order }));

      store.overrideSelector(selectCost, 1.2);

      const change = 0.8;
      service.purchase.mockReturnValue(of(change));

      const effectSpy = subscribeSpyTo(spectator.service.order$);

      expect(effectSpy.getLastValue()).toEqual(
        purchaseSuccess({ change, quantity })
      );
    });
  });
});
