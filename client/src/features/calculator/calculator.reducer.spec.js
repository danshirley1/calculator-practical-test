import { createStore } from 'redux';

import reducer from './calculator.reducer';

import {
  setNumericInput,
  setOperandInput,
  calculateExpression,
} from './calculator.actions';

describe('calculator reducer', () => {
  const initialReducerState = {
    display: '0',
    expression: ['0'],
  };
  let store;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('renders initial state', () => {
    const state = store.getState();
    expect(state).toEqual(initialReducerState);
  });

  it('sets numeric input - updates display expression', () => {
    store.dispatch(setNumericInput('2'));
    const state = store.getState();
    expect(state).toEqual({
      ...initialReducerState,
      display: '02',
      expression: ['02'],
    });
  });

  it('sets operand input - updates expression', () => {
    store.dispatch(setOperandInput('2'));
    const state = store.getState();
    expect(state).toEqual({
      ...initialReducerState,
      expression: ['02'],
    });
  });

  it('calculates expression - updates display as string', () => {
    store = createStore(reducer, {
      expression: ['2', '+', '2'],
    });
    store.dispatch(calculateExpression());
    const state = store.getState();
    expect(state).toEqual({
      ...initialReducerState,
      expression: ['2', '+', '2'],
      display: '4',
    });
  });
});
