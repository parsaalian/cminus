import _ from 'lodash';
import hash from 'object-hash';

export class StateDFA {
  constructor(rules) {
    this.counter = 1;
    this.items = constructItems(rules);
    this.states = { 0: new State(closure(this.items, this.items[0])) };
    this.stateHashs = { [this.states[0].getHash()]: 0 };
    this.constructStates(0);
  }

  getState(index) {
    return this.states[index];
  }

  constructStates(index) {
    const state = this.states[index];
    let gotos = {};
    let nexts = [];
    _.forEach(state.getProductions(), production => {
      gotos = production.getNextTerm() ? _.mergeWith(gotos,
              {[production.getNextTerm()]: goto(this.items, production, production.getNextTerm())},
              (objVal, srcVal) => _.isArray(objVal) ? _.uniq(objVal.concat(srcVal)) : [srcVal])
              : gotos;
    });
    _.forEach(gotos, (value, key) => {
      const newState = new State(_.flatten(value));
      if (!this.stateHashs[newState.getHash()]) {
        this.states[this.counter] = newState;
        this.stateHashs[newState.getHash()] = this.counter;
        state.setGoto(key, this.counter);
        nexts.push(this.counter);
        this.counter += 1;
      }
      else {
        state.setGoto(key, this.stateHashs[newState.getHash()]);
      }
    });
    _.forEach(nexts, next => this.constructStates(next));
  }
}

export class State {
  constructor(productions) {
    this.productions = productions;
    this.stateHash = hash(this.productions);
    this.gotos = {};
  }

  getProductions() {
    return this.productions;
  }

  getEndProductions() {
    return _.filter(this.productions, p => p.getRuleRHS().length === p.getPointer());
  }

  getHash() {
    return this.stateHash;
  }

  getGoto(symbol) {
    return this.gotos[symbol];
  }

  setGoto(term, state) {
    this.gotos[term] = state;
  }
}

export class Production {
  constructor(rule, pointer) {
    this.rule = rule;
    this.pointer = pointer;
  }

  getRule() {
    return this.rule;
  }

  getRuleLHS() {
    return this.rule[0];
  }

  getRuleRHS() {
    return _.tail(this.rule);
  }

  getPointer() {
    return this.pointer;
  }

  getNextTerm() {;
    return this.getRuleRHS()[this.pointer];
  }

  getNextProduction() {
    return new Production(this.rule, this.pointer + 1);
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
