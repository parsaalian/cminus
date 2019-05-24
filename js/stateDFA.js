import _ from 'lodash';
import hash from 'object-hash';

export class StateDFA {
  constructor(rules) {
    this._counter = 1;
    this._items = constructItems(rules);
    this._states = { 0: new State(closure(this._items, this._items[0])) };
    this._stateHashs = { [this._states[0].getHash()]: 0 };
    this.constructStates(0);
  }

  getStates() {
    return this._states;
  }

  constructStates(index) {
    const state = this._states[index];
    let gotos = {};
    let nexts = [];
    _.forEach(state.getProductions(), production => {
      gotos = production.getNextTerm() ? _.mergeWith(gotos,
              {[production.getNextTerm()]: goto(this._items, production, production.getNextTerm())},
              (objVal, srcVal) => _.isArray(objVal) ? _.uniq(objVal.concat(srcVal)) : [srcVal])
              : gotos;
    });
    _.forEach(gotos, (value, key) => {
      const newState = new State(_.flatten(value));
      if (!this._stateHashs[newState.getHash()]) {
        this._states[this._counter] = newState;
        this._stateHashs[newState.getHash()] = this._counter;
        state.setGoto(key, this._counter);
        nexts.push(this._counter);
        this._counter += 1;
      }
      else {
        state.setGoto(key, this._stateHashs[newState.getHash()]);
      }
    });
    _.forEach(nexts, next => this.constructStates(next));
  }
}

export class State {
  constructor(productions) {
    this._productions = productions;
    this._stateHash = hash(this._productions);
    this._gotos = {};
  }

  getProductions() {
    return this._productions;
  }

  getHash() {
    return this._stateHash;
  }

  getGotos() {
    return this._gotos;
  }

  setGoto(term, state) {
    this._gotos[term] = state;
  }
}

export class Production {
  constructor(rule, pointer) {
    this._rule = rule;
    this._pointer = pointer;
  }

  getRule() {
    return this._rule;
  }

  getRuleLHS() {
    return this._rule[0];
  }

  getRuleRHS() {
    return _.tail(this._rule);
  }

  getPointer() {
    return this._pointer;
  }

  getNextTerm() {;
    return this.getRuleRHS()[this._pointer];
  }

  getNextProduction() {
    return new Production(this._rule, this._pointer + 1);
  }
}

export const constructItems = function(rules) {
  return _.flatten(_.reduce(rules, (result, rule) => {
      result.push(_.reduce(_.range(rule.length), (res, n) => {
          res.push(new Production(rule, n));
          return res;
        }, [])
      );
      return result;
  }, []));
}

export const closure = function(items, production) {
  const terms = ['+', '*', '(', ')', 'id'];
  return _.uniq(_.concat(production, _.flatMap(_.filter(items,
                  item => item.getRuleLHS() === production.getNextTerm() && item.getPointer() === 0),
          item => {
            return _.includes(terms, item.getNextTerm()) || item === production ? [item] : closure(items, item);
          }
      )
  ));
}

export const goto = function(items, production, term) {
  return production.getNextTerm() === term ? closure(items, production.getNextProduction()) : undefined;
}
