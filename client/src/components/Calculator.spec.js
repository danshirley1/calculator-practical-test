import React from 'react';
import { shallow } from 'enzyme';

import Calculator from './Calculator';
import calculatorKeys from '../features/calculator/calculator.constants';

describe('Calculator Component', () => {
  let component;

  const defaultProps = {
    calcState: {
      expression: ['2', '+', '2'],
      display: '22',
    },
    onNumericKeypress: jest.fn((key) => key),
    onOperandKeypress: jest.fn((key) => key),
    onEqualsKeypress: jest.fn(),
  };

  const getComponent = (moreProps = {}) => {
    const componentProps = {
      ...defaultProps,
      ...moreProps,
    };

    return shallow((
      <Calculator {...componentProps} />
    ));
  };

  beforeEach(() => {
    component = getComponent();
  });

  it('renders numeric keys with expected labels', () => {
    calculatorKeys.numeric.forEach((key) => {
      const comp = component.find(`[data-test="numeric-key-${key}"]`);
      expect(comp.text()).toBe(key);
    });
  });  

  it('renders operand keys with expected labels', () => {
    calculatorKeys.operand.forEach((key) => {
      const comp = component.find(`[data-test="operand-key-${key}"]`);
      expect(comp.text()).toBe(key);
    });
  });  

  it('renders equals key with expected label', () => {
    const comp = component.find(`[data-test="equals-key-="]`);
    expect(comp.text()).toBe('=');
  });  

  it('fires numeric keypress event', () => {
    calculatorKeys.numeric.forEach((key) => {
      const comp = component.find(`[data-test="numeric-key-${key}"]`);
      comp.simulate('click');
      expect(defaultProps.onNumericKeypress).toBeCalledWith(key);
    });
  });  

  it('fires operand keypress event', () => {
    calculatorKeys.operand.forEach((key) => {
      const comp = component.find(`[data-test="operand-key-${key}"]`);
      comp.simulate('click');
      expect(defaultProps.onOperandKeypress).toBeCalledWith(key);
    });
  });  

  it('fires equals keypress event', () => {
    const comp = component.find(`[data-test="equals-key-="]`);
    comp.simulate('click');
    expect(defaultProps.onEqualsKeypress).toBeCalledWith('=');
  });  

  it('renders Expression label with expected content', () => {
    const comp = component.find('[data-test="expression-label"]');
    expect(comp.text()).toBe('Expression: 2 + 2');
  });  

  it('renders Display label with expected content', () => {
    const comp = component.find('[data-test="display-label"]');
    expect(comp.text()).toBe('Display: 22');
  });  
});
