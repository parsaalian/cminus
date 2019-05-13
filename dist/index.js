'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _definitions = require('./js/definitions');

var _ll = require('./js/ll1');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(leftRecursionElimination('statement-list', rules.get('statement-list')));
console.log((0, _ll.leftFactoring)('var-declaration', _definitions.rules.get('var-declaration')));
// console.log(leftFactoring('declaration-list', rules.get('declaration-list')));
// console.log(leftFactoring('var', rules.get('var')));