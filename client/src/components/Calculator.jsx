import React from 'react';

import calculatorKeys from '../features/calculator/calculator.constants';

const getKeys = (keyLabels, cb, testLabel) => keyLabels.map((label) => (
  <button key={`calcKey_${label}`} className="calculator-key-btn" onClick={() => cb(label)} data-test={`${testLabel}-key-${label}`}>
    {label}
  </button>
));

function Calculator(props) {
  const {
    calcState,
    onNumericKeypress,
    onOperandKeypress,
    onEqualsKeypress,
  } = props;

  const numericKeys = getKeys(calculatorKeys.numeric, onNumericKeypress, 'numeric');
  const operandKeys = getKeys(calculatorKeys.operand, onOperandKeypress, 'operand');
  const equalsKey   = getKeys(calculatorKeys.equals, onEqualsKeypress, 'equals');

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="calculator-keys">
            {numericKeys}
          </div>
        </div>
        <div className="col-4">
          {operandKeys}
          {equalsKey}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="calculator-expression" data-test="expression-label">
            Expression: {calcState.expression.join(' ')}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="calculator-display" data-test="display-label">
            Display: {calcState.display}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
