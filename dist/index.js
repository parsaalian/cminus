'use strict';

var _ll = require('./js/ll1');

var _definitions = require('./js/definitions');

console.log((0, _ll.first)('program'));

console.log((0, _ll.leftRecursionElimination)('statement-list', _definitions.rules.get('statement-list')));