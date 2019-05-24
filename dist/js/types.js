'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Listing = exports.isTerm = exports.Term = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Term = exports.Term = function () {
  function Term(symbol) {
    _classCallCheck(this, Term);

    this.symbol = symbol;
  }

  _createClass(Term, [{
    key: 'symbol',
    value: function symbol() {
      return this.symbol;
    }
  }]);

  return Term;
}();

var isTerm = exports.isTerm = function isTerm(variable, term) {
  return variable.constructor.name === 'Term' && variable.symbol() === term;
};

var Listing = exports.Listing = function () {
  function Listing() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Listing);

    this.list = list;
  }

  _createClass(Listing, [{
    key: 'add',
    value: function add(list) {
      _lodash2.default.merge(this.list, list);
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.list[name];
    }
  }, {
    key: 'list',
    value: function list() {
      return this.list;
    }
  }, {
    key: 'keys',
    value: function keys() {
      return this.list.keys;
    }
  }]);

  return Listing;
}();