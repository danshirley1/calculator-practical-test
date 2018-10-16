import { isNumber, toNumber, last, isEmpty } from 'lodash';

import calculatorKeys from '../calculator.constants';

// Do not append character if series already contains character
// @param series array|string The series to search
// @param char string Character to apply rules upon
const isSkipDuplicateKeyInput = (series, char) => {
  const charsSkippedOnDuplicate = ['.'];
  return charsSkippedOnDuplicate.includes(char) && series.includes(char);
}

const getLastNumericTermFromExpression = (expression) => last(expression, (term) => isNumber(term));

const isOperandTypeKey = (key) => calculatorKeys.operand.includes(key);

const concatenateNumericTerm = (prev, next) => isEmpty(prev) ? next : `${prev}${next}`;

export const isOperandActiveInExpression = (expression) => !!(expression.length && isOperandTypeKey(last(expression)));

export const updateDisplay = (expression, display, char) => {
  const isOperandActive = isOperandActiveInExpression(expression);

  if (isOperandActive) return char;
  return isSkipDuplicateKeyInput(display, char) ? display : `${display}${char}`;
};

export const updateExpression = (expression, char) => {
  const isOperandActive = isOperandActiveInExpression(expression);
  const isOperandKey = isOperandTypeKey(char);

  if (isSkipDuplicateKeyInput(getLastNumericTermFromExpression(expression), char)) {
    return expression;
  } else if (isOperandKey) {
    if (isOperandActive) {
      // Do not duplicate active operand entry
      return [...expression.slice(0, -1), char];
    }
  } else if (!isOperandActive) {
    // A numeric key entry
    const newElement = concatenateNumericTerm(getLastNumericTermFromExpression(expression), char);
    return [...expression.slice(0, -1), newElement];
  }

  return [...expression, char];
};

export const calculateExpression = (expression) => expression.reduce((acc, cur, idx, src) => {
  const previousKey = src[idx - 1];
  let rtn;

  switch (previousKey) {
    case '+':
      rtn = toNumber(acc) + toNumber(cur);
      break;

    case '-':
      rtn = toNumber(acc) - toNumber(cur);
      break;

    case '*':
      rtn = toNumber(acc) * toNumber(cur);
      break;

    case '/':
      rtn = toNumber(acc) / toNumber(cur);
      break;

    default:
      rtn = acc;
  }

  return rtn;
});
