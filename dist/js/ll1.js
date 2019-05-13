'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leftFactoring = exports.leftRecursionElimination = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _types = require('./types');

var _definitions = require('./definitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: Inter-rule left-recursion elimination ( e.g. A -> Ba, B -> Ab )
// TODO: Multi-repeat left-recursion elimination ( e.g. A -> AAb )
var leftRecursionElimination = exports.leftRecursionElimination = function leftRecursionElimination(name, definition) {
  var _ref2;

  var alphas = definition.filter(function (d) {
    return d[0] === name;
  }).map(function (d) {
    return _lodash2.default.slice(d, 1);
  });
  var betas = definition.filter(function (d) {
    return d[0] !== name;
  });
  return alphas.length === 0 ? _defineProperty({}, name, betas) : (_ref2 = {}, _defineProperty(_ref2, name, betas.map(function (beta) {
    return (0, _types.isTerm)(beta[0], 'EPS') ? [name + '\''] : _lodash2.default.concat(beta, name + '\'');
  })), _defineProperty(_ref2, name + '\'', _lodash2.default.concat(alphas.map(function (alpha) {
    return _lodash2.default.concat(alpha, name + '\'');
  }), [_definitions.terms.get('eps')])), _ref2);
};

// TODO: Multi-repeat left-factoring ( e.g. A -> Aa | A+b | A+c )
var leftFactoring = exports.leftFactoring = function leftFactoring(name, definition) {
  var result = _defineProperty({}, name, []);
  var prefixes = getLCSForRules(definition);
  _lodash2.default.forEach(definition, function (def, i) {
    var prefix = prefixes[0][i];
    var newName = prefix.length === def.length ? name : name + '-' + _lodash2.default.min(prefixes[1][prefix]);
    result[name] = _lodash2.default.concat(result[name], name === newName ? prefixes[1][prefix].length === 1 ? [def] : [] : [_lodash2.default.concat(prefix, newName)]);
    result[newName] = _lodash2.default.filter(_lodash2.default.concat(result[newName], name === newName ? [_definitions.terms.get('EPS')] : [_lodash2.default.slice(def, prefix.length)]), function (o) {
      return o !== undefined;
    });
    result[name] = _lodash2.default.reduce(result[name], function (res, n) {
      if (_lodash2.default.find(res, function (o) {
        return _lodash2.default.isEqual(o, n);
      }) === undefined) {
        res.push(n);
      }
      return res;
    }, []);
  });
  return result;
};

var getLCSForRules = function getLCSForRules(definition) {
  var prefixes = {};
  var prefixesNums = {};
  _lodash2.default.forEach(definition, function (def1, i) {
    var prefixI = _lodash2.default.concat(def1, []);
    _lodash2.default.forEach(definition, function (def2, j) {
      var prefixIJ = i !== j ? getPrefix(def1, def2) : prefixI;
      prefixI = prefixIJ.length > 0 ? prefixIJ : prefixI;
    });
    prefixes[i] = prefixI;
    prefixesNums[prefixI] = _lodash2.default.filter(_lodash2.default.concat(prefixesNums[prefixI], i), function (o) {
      return o !== undefined;
    });
  });
  return [prefixes, prefixesNums];
};

var getPrefix = function getPrefix(array1, array2) {
  return _lodash2.default.filter(array1, function (value, i) {
    return array1[i] === array2[i];
  });
};