import _ from 'lodash';
import { Listing } from './js/types';
import { terms, rules } from './js/definitions';
import { leftRecursionElimination, leftFactoring } from './js/ll1';

const leftRecursionEliminated = new Listing();
const leftFactored = new Listing();

_.forEach(rules.list(), (value, key) => {
  leftRecursionEliminated.add(leftRecursionElimination(key, value));
});

_.forEach(leftRecursionEliminated.list(), (value, key) => {
  leftFactored.add(leftFactoring(key, value));
});

_.forEach(leftFactored.list(), (value, key) => {
  console.log(key, value);
});
