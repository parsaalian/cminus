'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _types = require('./js/types');

var _definitions = require('./js/definitions');

var _ll = require('./js/ll1');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leftRecursionEliminated = new _types.Listing();
var leftFactored = new _types.Listing();

_lodash2.default.forEach(_definitions.rules.list(), function (value, key) {
  leftRecursionEliminated.add((0, _ll.leftRecursionElimination)(key, value));
});

_lodash2.default.forEach(leftRecursionEliminated.list(), function (value, key) {
  leftFactored.add((0, _ll.leftFactoring)(key, value));
});

console.log(Object.keys(leftFactored.list()).length);