'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nterms = exports.terms = undefined;

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

var nterms = exports.nterms = new _types.Listing({
  'program': new _types.NTerm([['declaration-list', terms.get('eof')]]),
  'declaration-list': new _types.NTerm([['declaration-list', 'declaration'], [terms.get('eps')]]),
  'declaration': new _types.NTerm([['var-declaration'], ['fun-declaration']]),
  'var-declaration': new _types.NTerm([['type-specifier', terms.get('id'), terms.get(';')], ['type-specifier', terms.get('id'), terms.get('['), terms.get('num'), terms.get(']'), terms.get(';')]]),
  'type-specifier': new _types.NTerm([[terms.get('int')], [terms.get('void')]]),
  'fun-declaration': new _types.NTerm([['type-specifier', terms.get('id'), terms.get('('), 'params', terms.get(')'), 'compound-stmt']]),
  'params': new _types.NTerm([['param-list'], [terms.get('void')]]),
  'param-list': new _types.NTerm([['param-list', terms.get(','), 'param'], ['param']]),
  'param': new _types.NTerm([['type-specifier', terms.get('id')], ['type-specifier', terms.get('id'), terms.get('['), terms.get(']')]]),
  'compound-stmt': new _types.NTerm([[terms.get('{'), 'declaration-list', 'statement-list', terms.get('}')]]),
  'statement-list': new _types.NTerm([['statement-list', 'statement'], [terms.get('eps')]]),
  'statement': new _types.NTerm([['expression-stmt'], ['compound-stmt'], ['selection-stmt'], ['iteration-stmt'], ['return-stmt'], ['switch-stmt']]),
  'expression-stmt': new _types.NTerm([['expression', terms.get(';')], [terms.get('continue'), terms.get(';')], [terms.get('break'), terms.get(';')], [terms.get(';')]]),
  'selection-stmt': new _types.NTerm([[terms.get('if'), terms.get('('), 'expression', terms.get(')'), 'statement', terms.get('else'), 'statement']]),
  'iteration-stmt': new _types.NTerm([[terms.get('while'), terms.get('('), 'expression', terms.get(')'), 'statement']]),
  'return-stmt': new _types.NTerm([[terms.get('return'), terms.get(';')], [terms.get('return'), 'expression', terms.get(';')]]),
  'switch-stmt': new _types.NTerm([[terms.get('switch'), terms.get('('), 'expression', terms.get(')'), terms.get('{'), 'case-stmts', 'default-stmt', terms.get('}')]]),
  'case-stmts': new _types.NTerm([['case-stmts', 'case-stmt'], [terms.get('eps')]]),
  'case-stmt': new _types.NTerm([[terms.get('case'), terms.get('num'), terms.get(':'), 'statement-list']]),
  'default-stmt': new _types.NTerm([[terms.get('default'), terms.get(':'), 'statement-list'], [terms.get('eps')]]),
  'expression': new _types.NTerm([['var', terms.get('='), 'expression'], ['simple-expression']]),
  'var': new _types.NTerm([['additive-expression', 'relop', 'additive-expression'], ['additive-expression']]),
  'relop': new _types.NTerm([[terms.get('<')], [terms.get('='), terms.get('=')]]),
  'additive-expression': new _types.NTerm([['additive-expression', 'addop', 'term'], ['term']]),
  'addop': new _types.NTerm([[terms.get('+')], [terms.get('-')]]),
  'term': new _types.NTerm([['term', terms.get('*'), 'signed-factor'], ['signed-factor']]),
  'signed-factor': new _types.NTerm([['factor'], [terms.get('+'), 'factor'], [terms.get('-'), 'factor']]),
  'factor': new _types.NTerm([[terms.get('('), 'expression', terms.get(')')], ['var'], ['call'], [terms.get('num')]]),
  'call': new _types.NTerm([[terms.get('id'), terms.get('('), 'args', terms.get(')')]]),
  'args': new _types.NTerm([['arglist'], [terms.get('eps')]]),
  'arg-list': new _types.NTerm([['arglist', terms.get(','), 'expression'], ['expression']])
});