import _ from 'lodash';

export class Term {
  constructor(symbol) {
    this.symbol = symbol;
  }

  symbol() {
    return this.symbol;
  }
}

export const isTerm = function(variable, term) {
  return variable.constructor.name === 'Term' && variable.symbol() === term;
}

export class Listing {
  constructor(list={}) {
    this.list = list;
  }

  add(list) {
    _.merge(this.list, list);
  }

  get(name) {
    return this.list[name];
  }

  list() {
    return this.list;
  }

  keys() {
    return this.list.keys;
  }
}
