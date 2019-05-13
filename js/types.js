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

  list() {
    return this._list;
  }

  keys() {
    return this._list.keys;
  }
}
