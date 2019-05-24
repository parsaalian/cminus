/*import { Listing } from './js/types';
import { leftRecursionElimination, leftFactoring } from './js/ll1';*/

/*const leftRecursionEliminated = new Listing();
const leftFactored = new Listing();

_.forEach(rules.list(), (value, key) => {
  leftRecursionEliminated.add(leftRecursionElimination(key, value));
});

_.forEach(leftRecursionEliminated.list(), (value, key) => {
  leftFactored.add(leftFactoring(key, value));
});

_.forEach(leftRecursionEliminated.list(), (value, key) => {
  console.log(key, value);
});*/

import _ from 'lodash';
import Parser from './js/parser';

const rules = [
  ['E\'', 'E'],
  ['E', 'E', '+', 'T'],
  ['E', 'T'],
  ['T', 'T', '*', 'F'],
  ['T', 'F'],
  ['F', '(', 'E', ')'],
  ['F', 'id']
];
const input = ['id', '*', 'id', '+', 'id'];

const parser = new Parser(rules, input);
parser.parse();
console.log(parser.getReductions());
