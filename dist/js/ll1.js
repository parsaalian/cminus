'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leftRecursionElimination = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _types = require('./types');

var _definitions = require('./definitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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