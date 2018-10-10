import { combineReducers, createStore, compose } from 'redux';

import calculatorReducer from '../features/calculator/calculator.reducer';

const initialState = {};
const enhancers = [];

// dev tools
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(...enhancers);

const rootReducer = combineReducers({
  calcState: calculatorReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export default store;
