import {
  updateDisplay,
  updateExpression,
  calculateExpression,
} from './utils/userInput';

import {
  SET_NUMERIC_INPUT,
  SET_OPERAND_INPUT,
  CALCULATE_EXPRESSION,
} from './calculator.actions';

const initialState = {
  display: '0',
  expression: ['0'],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_NUMERIC_INPUT: {
      const { key } = action;
      const display = updateDisplay(state.expression, state.display, key);
      const expression = updateExpression(state.expression, key);

      return {
        ...state,
        expression,
        display,
      };
    }

    case SET_OPERAND_INPUT: {
      const { key } = action;
      const expression = updateExpression(state.expression, key);

      return {
        ...state,
        expression,
      };
    }

    case CALCULATE_EXPRESSION: {
      const display = calculateExpression(state.expression).toString();

      return {
        ...state,
        display,
      };
    }

    default:
      return state;
  }
}
