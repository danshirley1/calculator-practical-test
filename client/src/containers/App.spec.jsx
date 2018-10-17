import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';

describe('App Container', () => {
  let component;

  const defaultProps = {
    calcState: { foo: 'bar' },
    onNumericKeypress: jest.fn(),
    onOperandKeypress: jest.fn(),
    onEqualsKeypress:  jest.fn(),
  };

  const getComponent = (moreProps = {}) => {
    const componentProps = {
      ...defaultProps,
      ...moreProps,
    };

    return shallow((
      <App {...componentProps} />
    ));
  };

  beforeEach(() => {
    component = getComponent();
  });

  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders Calculator component with expected props', () => {
    const calc = component.find('Calculator');

    expect(calc.props()).toEqual({
      calcState: defaultProps.calcState,
      onNumericKeypress: defaultProps.onNumericKeypress,
      onOperandKeypress: defaultProps.onOperandKeypress,
      onEqualsKeypress:  defaultProps.onEqualsKeypress,
    });
  });  
});
