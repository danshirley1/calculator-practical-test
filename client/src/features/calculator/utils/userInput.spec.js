import {
  updateDisplay,
  updateExpression,
  calculateExpression,
  isOperandActiveInExpression,
} from './userInput';

describe('userInput utils', () => {
  describe('isOperandActiveInExpression()', () => {
    it('returns true when operand is active', () => {
      expect(isOperandActiveInExpression(['+'])).toBe(true);
      expect(isOperandActiveInExpression(['+', '2', '-'])).toBe(true);
    });

    it('returns false when operand is not active', () => {
      expect(isOperandActiveInExpression([])).toBe(false);
      expect(isOperandActiveInExpression(['2'])).toBe(false);
      expect(isOperandActiveInExpression(['2', '-', '3'])).toBe(false);
    });
  });

  describe('updateDisplay()', () => {
    it('updates a string as expected when operand is not active', () => {
      const expression = [];
      let str = '';

      str = updateDisplay(expression, str, '1');
      expect(str).toBe('1');

      str = updateDisplay(expression, str, '0');
      expect(str).toBe('10');
    })    

    it('updates a string as expected when operand is active', () => {
      const expression = ['+'];
      let str = '';

      str = updateDisplay(expression, str, '1');
      expect(str).toBe('1');

      str = updateDisplay(expression, str, '0');
      expect(str).toBe('0');
    })    

    it('updates a string as expected when there is a decimal point', () => {
      const expression = [];
      let str = '';

      str = updateDisplay(expression, str, '.');
      expect(str).toBe('.');

      str = updateDisplay(expression, str, '1');
      expect(str).toBe('.1');

      str = updateDisplay(expression, str, '.');
      expect(str).toBe('.1');

      str = updateDisplay(expression, str, '0');
      expect(str).toBe('.10');

      str = updateDisplay(expression, str, '.');
      expect(str).toBe('.10');
    })
  })

  describe('updateExpression()', () => {
    it('updates an array as expected when operand IS NOT active and supplied char IS NOT an operand type key', () => {
      let expression = [];

      expression = updateExpression(expression, '2');
      expect(expression).toEqual(['2']);

      expression = updateExpression(expression, '0');
      expect(expression).toEqual(['20']);    
    })

    it('updates an array as expected when operand IS NOT active and supplied char IS an operand type key', () => {
      let expression = [];

      expression = updateExpression(expression, '2');
      expect(expression).toEqual(['2']);

      expression = updateExpression(expression, '/');
      expect(expression).toEqual(['2', '/']); 

      expression = updateExpression(expression, '2');
      expect(expression).toEqual(['2', '/', '2']); 
    })

    it('updates an array as expected when operand IS active and supplied char IS NOT an operand type key', () => {
      let expression = ['/'];

      expression = updateExpression(expression, '2');
      expect(expression).toEqual(['/', '2']);
    })    

    it('updates an array as expected when operand IS active and supplied char IS an operand type key', () => {
      let expression = ['/'];

      expression = updateExpression(expression, '*');
      expect(expression).toEqual(['*']);
    })    

    it('updates an array as expected when last term contains a decimal point', () => {
      let expression = [];

      expression = updateExpression(expression, '0');
      expect(expression).toEqual(['0']);

      expression = updateExpression(expression, '.');
      expect(expression).toEqual(['0.']);

      expression = updateExpression(expression, '5');
      expect(expression).toEqual(['0.5']);

      expression = updateExpression(expression, '.');
      expect(expression).toEqual(['0.5']);
    })    
  })

  describe('calculateExpression()', () => {
    it('calculates an expression as expected', () => {
      expect(calculateExpression(['2.5', '*', '4', '/', '2', '-', '2', '+', '7.5'])).toBe(10.5);
    });
  });  
})
