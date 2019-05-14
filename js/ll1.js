import _ from 'lodash';
import { Term, isTerm } from './types';
import { terms, rules } from './definitions';

export const first = function(symbol) {
  let firstSet = new Set([]);
  let visitedSymbols = new Set([]);
  let queue = [symbol];
  while (queue.length > 0) {
    let v = queue.shift();
    visitedSymbols.add(v);
    let firsts = rules.get(v).map(x => (x.length > 0) ? x[0] : terms.get('EPS'));
    firstSet.add(...firsts.filter(x => (x instanceof Term)));
    queue.push(...firsts.filter(x => !(x instanceof Term)).filter(x => !visitedSymbols.has(x)));
  }
  return firstSet;
}

// TODO: Inter-rule left-recursion elimination ( e.g. A -> Ba, B -> Ab )
// TODO: Multi-repeat left recursion elimination ( e.g. A -> AAb )
export const leftRecursionElimination = function(name, definition) {
  return {
    [name]: definition.filter(d => d[0] !== name).
            map(beta => isTerm(beta[0], 'EPS') ? [name + '\''] : _.concat(beta, name + '\'')),
    [name + '\'']: _.concat(definition.filter(d => d[0] === name).
                  map(d => _.slice(d, 1)).
                  map(alpha => _.concat(alpha, name + '\'')), [terms.get('eps')])
  };
}

export const leftFactoring = function(definition) {

}
