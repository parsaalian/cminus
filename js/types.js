import _ from 'lodash';

export class Term {
  constructor(symbol) {
    this._symbol = symbol;
  }

  symbol() {
    return this._symbol;
  }
}

export const isTerm = function(variable, term) {
  return variable.constructor.name === 'Term' && variable.symbol() === term;
}

export class NTerm {
  constructor(definitions) {
    this._definitions = definitions;
  }

  definitions() {
    return this._definitions;
  }
}

export class Listing {
  constructor(list={}) {
    this._list = list;
  }

  add(list) {
    _.merge(this._list, list);
  }

  get(name) {
    return this._list[name];
  }

  compare(element1, element2) {
    return element1.constructor.name === element2.constructor.name;
  }
}