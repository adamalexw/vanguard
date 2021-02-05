import { clearPurchase, purchaseSuccess, reSupply } from './actions';
import { initialState, reducer } from './reducer';

describe('VendingMachineReducer', () => {
  describe('ClearPurchase', () => {
    it('should update state to clear previous purchase', () => {
      const action = clearPurchase();
      const expectedState = {
        change: undefined,
        purchaseSuccess: undefined,
        stock: 1,
        loaded: false,
        loading: false,
        purchaseError: undefined,
        purchasing: false,
        cost: 0,
      };

      const state = reducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
  });

  describe('PurchaseOrderSuccess', () => {
    it('should update stock after a purchase', () => {
      const change = 0.8;
      const action = purchaseSuccess({ change, quantity: 1 });
      const expectedState = {
        change,
        purchaseSuccess: true,
        stock: 0,
        loaded: false,
        loading: false,
        purchaseError: undefined,
        purchasing: false,
        cost: 0,
      };

      const state = reducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
  });

  describe('Resupply', () => {
    it('should update stock after resupply', () => {
      const quantity = 10;
      const action = reSupply({ quantity });
      const expectedState = {
        change: undefined,
        cost: 0,
        loaded: false,
        loading: false,
        puchasing: false,
        resupply: quantity,
        stock: quantity,
      };

      const state = reducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
  });
});
