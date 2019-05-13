'use strict';

var _definitions = require('./js/definitions');

var _ll = require('./js/ll1');

console.log((0, _ll.leftRecursionElimination)('statement-list', _definitions.rules.get('statement-list')));