import { initialState } from './reducer';
import { selectStock } from './selectors';

// No complex selectors with business logic
describe('Selectors', () => {
  it('should select the stock', () => {
    const stock = 5;
    const state = { ...initialState, stock };

    const result = selectStock.projector(state, state.stock);
    expect(result).toBe(stock);
  });
});
