import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import logo from '../ee_logo.svg';
import '../styles/main.scss';
import { setNumericInput, setOperandInput, calculateExpression } from '../features/calculator/calculator.actions';
import Calculator from '../components/Calculator';

export const App = (props) => {
  const { calcState, onNumericKeypress, onOperandKeypress, onEqualsKeypress } = props;

  return (
    <Fragment>
      <div className="container-fluid app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <Calculator
              calcState={calcState}
              onNumericKeypress={onNumericKeypress}
              onOperandKeypress={onOperandKeypress}
              onEqualsKeypress={onEqualsKeypress}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default connect(
  state => ({
    calcState: state.calcState,
  }),
  {
    onNumericKeypress: setNumericInput,
    onOperandKeypress: setOperandInput,
    onEqualsKeypress: calculateExpression,
  },
)(App);
