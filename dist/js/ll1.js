'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leftFactoring = exports.leftRecursionElimination = exports.first = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _types = require('./types');

var _definitions = require('./definitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var first = exports.first = function first(symbol) {
  var firstSet = new Set([]);
  var visitedSymbols = new Set([]);
  var queue = [symbol];
  while (queue.length > 0) {
    var v = queue.shift();
    visitedSymbols.add(v);
    var firsts = _definitions.rules.get(v).map(function (x) {
      return x.length > 0 ? x[0] : _definitions.terms.get('EPS');
    });
    firstSet.add.apply(firstSet, _toConsumableArray(firsts.filter(function (x) {
      return x instanceof _types.Term;
    })));
    queue.push.apply(queue, _toConsumableArray(firsts.filter(function (x) {
      return !(x instanceof _types.Term);
    }).filter(function (x) {
      return !visitedSymbols.has(x);
    })));
  }
  return firstSet;
};

// TODO: Inter-rule left-recursion elimination ( e.g. A -> Ba, B -> Ab )
// TODO: Multi-repeat left recursion elimination ( e.g. A -> AAb )
var leftRecursionElimination = exports.leftRecursionElimination = function leftRecursionElimination(name, definition) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, name, definition.filter(function (d) {
    return d[0] !== name;
  }).map(function (beta) {
    return (0, _types.isTerm)(beta[0], 'EPS') ? [name + '\''] : _lodash2.default.concat(beta, name + '\'');
  })), _defineProperty(_ref, name + '\'', _lodash2.default.concat(definition.filter(function (d) {
    return d[0] === name;
  }).map(function (d) {
    return _lodash2.default.slice(d, 1);
  }).map(function (alpha) {
    return _lodash2.default.concat(alpha, name + '\'');
  }), [_definitions.terms.get('eps')])), _ref;
};

var leftFactoring = exports.leftFactoring = function leftFactoring(definition) {};