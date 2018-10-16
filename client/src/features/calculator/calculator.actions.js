export const SET_NUMERIC_INPUT = 'SET_NUMERIC_INPUT';
export const SET_OPERAND_INPUT = 'SET_OPERAND_INPUT';
export const CALCULATE_EXPRESSION = 'CALCULATE_EXPRESSION';

export function setNumericInput(key) {
  return { type: SET_NUMERIC_INPUT, key };
}

export function setOperandInput(key) {
  return { type: SET_OPERAND_INPUT, key };
}

export function calculateExpression() {
  return { type: CALCULATE_EXPRESSION };
}
