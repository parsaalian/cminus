'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rules = exports.terms = undefined;

var _types = require('./types');

var terms = exports.terms = new _types.Listing({
  'eof': new _types.Term('EOF'),
  'eps': new _types.Term('EPS'),
  'id': new _types.Term('ID'),
  'num': new _types.Term('NUM'),
  'int': new _types.Term('INT'),
  'void': new _types.Term('VOID'),
  'continue': new _types.Term('CONT'),
  'break': new _types.Term('BREAK'),
  'if': new _types.Term('IF'),
  'else': new _types.Term('ELSE'),
  'while': new _types.Term('WHILE'),
  'return': new _types.Term('RET'),
  'switch': new _types.Term('SWITCH'),
  'case': new _types.Term('CASE'),
  'default': new _types.Term('DEF'),
  '{': new _types.Term('{'),
  '}': new _types.Term('}'),
  '(': new _types.Term('('),
  ')': new _types.Term(')'),
  '[': new _types.Term('['),
  ']': new _types.Term(']'),
  ',': new _types.Term(','),
  ';': new _types.Term(';'),
  ':': new _types.Term(':'),
  '=': new _types.Term('='),
  '<': new _types.Term('<'),
  '+': new _types.Term('+'),
  '-': new _types.Term('-'),
  '*': new _types.Term('*')
});

var rules = exports.rules = new _types.Listing({
  'program': [['declaration-list', terms.get('eof')]],
  'declaration-list': [['declaration-list', 'declaration'], [terms.get('eps')]],
  'declaration': [['var-declaration'], ['fun-declaration']],
  'var-declaration': [['type-specifier', terms.get('id'), terms.get(';')], ['type-specifier', terms.get('id'), terms.get('['), terms.get('num'), terms.get(']'), terms.get(';')]],
  'type-specifier': [[terms.get('int')], [terms.get('void')]],
  'fun-declaration': [['type-specifier', terms.get('id'), terms.get('('), 'params', terms.get(')'), 'compound-stmt']],
  'params': [['param-list'], [terms.get('void')]],
  'param-list': [['param-list', terms.get(','), 'param'], ['param']],
  'param': [['type-specifier', terms.get('id')], ['type-specifier', terms.get('id'), terms.get('['), terms.get(']')]],
  'compound-stmt': [[terms.get('{'), 'declaration-list', 'statement-list', terms.get('}')]],
  'statement-list': [['statement-list', 'statement'], [terms.get('eps')]],
  'statement': [['expression-stmt'], ['compound-stmt'], ['selection-stmt'], ['iteration-stmt'], ['return-stmt'], ['switch-stmt']],
  'expression-stmt': [['expression', terms.get(';')], [terms.get('continue'), terms.get(';')], [terms.get('break'), terms.get(';')], [terms.get(';')]],
  'selection-stmt': [[terms.get('if'), terms.get('('), 'expression', terms.get(')'), 'statement', terms.get('else'), 'statement']],
  'iteration-stmt': [[terms.get('while'), terms.get('('), 'expression', terms.get(')'), 'statement']],
  'return-stmt': [[terms.get('return'), terms.get(';')], [terms.get('return'), 'expression', terms.get(';')]],
  'switch-stmt': [[terms.get('switch'), terms.get('('), 'expression', terms.get(')'), terms.get('{'), 'case-stmts', 'default-stmt', terms.get('}')]],
  'case-stmts': [['case-stmts', 'case-stmt'], [terms.get('eps')]],
  'case-stmt': [[terms.get('case'), terms.get('num'), terms.get(':'), 'statement-list']],
  'default-stmt': [[terms.get('default'), terms.get(':'), 'statement-list'], [terms.get('eps')]],
  'expression': [['var', terms.get('='), 'expression'], ['simple-expression']],
  'var': [['additive-expression', 'relop', 'additive-expression'], ['additive-expression']],
  'relop': [[terms.get('<')], [terms.get('='), terms.get('=')]],
  'additive-expression': [['additive-expression', 'addop', 'term'], ['term']],
  'addop': [[terms.get('+')], [terms.get('-')]],
  'term': [['term', terms.get('*'), 'signed-factor'], ['signed-factor']],
  'signed-factor': [['factor'], [terms.get('+'), 'factor'], [terms.get('-'), 'factor']],
  'factor': [[terms.get('('), 'expression', terms.get(')')], ['var'], ['call'], [terms.get('num')]],
  'call': [[terms.get('id'), terms.get('('), 'args', terms.get(')')]],
  'args': [['arglist'], [terms.get('eps')]],
  'arg-list': [['arglist', terms.get(','), 'expression'], ['expression']]
});