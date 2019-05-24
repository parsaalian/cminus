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
import { StateDFA } from './js/stateDFA';

const rules = [
  ['E\'', 'E'],
  ['E', 'E', '+', 'T'],
  ['E', 'T'],
  ['T', 'T', '*', 'F'],
  ['T', 'F'],
  ['F', '(', 'E', ')'],
  ['F', 'id']
];

const states = new StateDFA(rules);

_.forEach(states.getStates(), (value, key) => {
  console.log(key);
  console.log(value.getProductions());
  console.log(value.getGotos());
  console.log();
});
