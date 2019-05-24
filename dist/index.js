'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _parser = require('./js/parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var rules = [['E\'', 'E'], ['E', 'E', '+', 'T'], ['E', 'T'], ['T', 'T', '*', 'F'], ['T', 'F'], ['F', '(', 'E', ')'], ['F', 'id']];
var input = ['id', '*', 'id', '+', 'id'];

var parser = new _parser2.default(rules, input);
parser.parse();
console.log(parser.getReductions());