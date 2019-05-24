'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _stateDFA = require('./stateDFA');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser(rules, input) {
    _classCallCheck(this, Parser);

    this.dfa = new _stateDFA.StateDFA(rules);
    this.follows = { 'E\'': ['$'], 'E': ['$', '+'], 'T': ['$', '+', '*'], 'F': ['$', '+', '*'] };
    this.stack = [0];
    this.symbols = [];
    this.reductions = [];
    this.input = _lodash2.default.concat(input, ['$']);
  }

  _createClass(Parser, [{
    key: 'getNextInput',
    value: function getNextInput() {
      return this.input[0];
    }
  }, {
    key: 'stackTop',
    value: function stackTop() {
      return _lodash2.default.last(this.stack);
    }
  }, {
    key: 'shift',
    value: function shift() {
      this.stack.push(this.dfa.getState(this.stackTop()).getGoto(this.getNextInput()));
      this.symbols.push(this.input[0]);
      this.input = _lodash2.default.slice(this.input, 1);
    }
  }, {
    key: 'reduce',
    value: function reduce(rule) {
      var replace = rule.getRuleLHS();
      var compare = rule.getRuleRHS();
      while (this.symbols.length > 0 && _lodash2.default.last(this.symbols) == _lodash2.default.last(compare)) {
        this.symbols.pop();
        compare.pop();
        this.stack.pop();
      }
      var nextState = this.dfa.getState(this.stackTop()).getGoto(replace);
      if (nextState) {
        this.stack.push(nextState);
      }
      this.symbols.push(replace);
      this.reductions.push(rule.getRule());
    }
  }, {
    key: 'getReductions',
    value: function getReductions() {
      return _lodash2.default.reverse(this.reductions);
    }
  }, {
    key: 'trace',
    value: function trace() {
      console.log(this.stack);
      console.log(this.symbols);
      console.log(this.input);
    }
  }, {
    key: 'parse',
    value: function parse() {
      var _this = this;

      if (this.getNextInput() !== '$' || this.stackTop() !== 0) {
        var reduceRule = void 0;
        if (_lodash2.default.reduce(this.dfa.getState(this.stackTop()).getEndProductions(), function (res, p) {
          if (_lodash2.default.includes(_this.follows[p.getRuleLHS()], _this.getNextInput())) {
            reduceRule = p;
            res = true;
          }
          return res;
        }, false)) {
          this.reduce(reduceRule);
        } else {
          this.shift();
        }
        this.parse();
      }
    }
  }]);

  return Parser;
}();

exports.default = Parser;