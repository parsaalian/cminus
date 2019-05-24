'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goto = exports.closure = exports.constructItems = exports.Production = exports.State = exports.StateDFA = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateDFA = exports.StateDFA = function () {
  function StateDFA(rules) {
    _classCallCheck(this, StateDFA);

    this._counter = 1;
    this._items = constructItems(rules);
    this._states = { 0: new State(closure(this._items, this._items[0])) };
    this._stateHashs = _defineProperty({}, this._states[0].getHash(), 0);
    this.constructStates(0);
  }

  _createClass(StateDFA, [{
    key: 'getStates',
    value: function getStates() {
      return this._states;
    }
  }, {
    key: 'constructStates',
    value: function constructStates(index) {
      var _this = this;

      var state = this._states[index];
      var gotos = {};
      var nexts = [];
      _lodash2.default.forEach(state.getProductions(), function (production) {
        gotos = production.getNextTerm() ? _lodash2.default.mergeWith(gotos, _defineProperty({}, production.getNextTerm(), goto(_this._items, production, production.getNextTerm())), function (objVal, srcVal) {
          return _lodash2.default.isArray(objVal) ? _lodash2.default.uniq(objVal.concat(srcVal)) : [srcVal];
        }) : gotos;
      });
      _lodash2.default.forEach(gotos, function (value, key) {
        var newState = new State(_lodash2.default.flatten(value));
        if (!_this._stateHashs[newState.getHash()]) {
          _this._states[_this._counter] = newState;
          _this._stateHashs[newState.getHash()] = _this._counter;
          state.setGoto(key, _this._counter);
          nexts.push(_this._counter);
          _this._counter += 1;
        } else {
          state.setGoto(key, _this._stateHashs[newState.getHash()]);
        }
      });
      _lodash2.default.forEach(nexts, function (next) {
        return _this.constructStates(next);
      });
    }
  }]);

  return StateDFA;
}();

var State = exports.State = function () {
  function State(productions) {
    _classCallCheck(this, State);

    this._productions = productions;
    this._stateHash = (0, _objectHash2.default)(this._productions);
    this._gotos = {};
  }

  _createClass(State, [{
    key: 'getProductions',
    value: function getProductions() {
      return this._productions;
    }
  }, {
    key: 'getHash',
    value: function getHash() {
      return this._stateHash;
    }
  }, {
    key: 'getGotos',
    value: function getGotos() {
      return this._gotos;
    }
  }, {
    key: 'setGoto',
    value: function setGoto(term, state) {
      this._gotos[term] = state;
    }
  }]);

  return State;
}();

var Production = exports.Production = function () {
  function Production(rule, pointer) {
    _classCallCheck(this, Production);

    this._rule = rule;
    this._pointer = pointer;
  }

  _createClass(Production, [{
    key: 'getRule',
    value: function getRule() {
      return this._rule;
    }
  }, {
    key: 'getRuleLHS',
    value: function getRuleLHS() {
      return this._rule[0];
    }
  }, {
    key: 'getRuleRHS',
    value: function getRuleRHS() {
      return _lodash2.default.tail(this._rule);
    }
  }, {
    key: 'getPointer',
    value: function getPointer() {
      return this._pointer;
    }
  }, {
    key: 'getNextTerm',
    value: function getNextTerm() {
      ;
      return this.getRuleRHS()[this._pointer];
    }
  }, {
    key: 'getNextProduction',
    value: function getNextProduction() {
      return new Production(this._rule, this._pointer + 1);
    }
  }]);

  return Production;
}();

var constructItems = exports.constructItems = function constructItems(rules) {
  return _lodash2.default.flatten(_lodash2.default.reduce(rules, function (result, rule) {
    result.push(_lodash2.default.reduce(_lodash2.default.range(rule.length), function (res, n) {
      res.push(new Production(rule, n));
      return res;
    }, []));
    return result;
  }, []));
};

/*export const closure = function(items, production) {
  return _.concat(production, _.filter(items, (item) => {
    return item.getRuleLHS() === production.getNextTerm() && item.getPointer() === 0;
  }));
}*/

var closure = exports.closure = function closure(items, production) {
  var terms = ['+', '*', '(', ')', 'id'];
  return _lodash2.default.uniq(_lodash2.default.concat(production, _lodash2.default.flatMap(_lodash2.default.filter(items, function (item) {
    return item.getRuleLHS() === production.getNextTerm() && item.getPointer() === 0;
  }), function (item) {
    return _lodash2.default.includes(terms, item.getNextTerm()) || item === production ? [item] : closure(items, item);
  })));
};

var goto = exports.goto = function goto(items, production, term) {
  return production.getNextTerm() === term ? closure(items, production.getNextProduction()) : undefined;
};