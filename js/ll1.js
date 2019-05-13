import _ from 'lodash';
import { isTerm } from './types';
import { terms } from './definitions';

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
