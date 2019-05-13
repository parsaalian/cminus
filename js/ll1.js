import _ from 'lodash';
import { isTerm } from './types';
import { terms } from './definitions';

// TODO: Inter-rule left-recursion elimination ( e.g. A -> Ba, B -> Ab )
// TODO: Multi-repeat left-recursion elimination ( e.g. A -> AAb )
export const leftRecursionElimination = function(name, definition) {
  const alphas = definition.filter(d => d[0] === name).map(d => _.slice(d, 1));
  const betas = definition.filter(d => d[0] !== name);
  return alphas.length === 0 ? {
      [name]: betas
  } : {
    [name]: betas.map(beta => isTerm(beta[0], 'EPS') ? [name + '\''] : _.concat(beta, name + '\'')),
    [name + '\'']: _.concat(alphas.map(alpha => _.concat(alpha, name + '\'')), [terms.get('eps')])
  };
}


// TODO: Multi-repeat left-factoring ( e.g. A -> Aa | A+b | A+c )
export const leftFactoring = function(name, definition) {
  let result = {[name]: []};
  const prefixes = getLCSForRules(definition);
  _.forEach(definition, (def, i) => {
    const prefix = prefixes[0][i];
    const newName = prefix.length === def.length ? name : name + '-' + _.min(prefixes[1][prefix]);
    result[name] = _.concat(result[name], name === newName ? (prefixes[1][prefix].length === 1 ? [def] : []) : [_.concat(prefix, newName)]);
    result[newName] = _.filter(_.concat(result[newName], name === newName ? [terms.get('EPS')] : [_.slice(def, prefix.length)]), o => o !== undefined);
    result[name] = _.reduce(result[name], (res, n) => {
      if (_.find(res, o => _.isEqual(o, n)) === undefined) {
        res.push(n);
      }
      return res;
    }, []);
  });
  return result;
}

const getLCSForRules = function(definition) {
  let prefixes = {};
  let prefixesNums = {};
  _.forEach(definition, (def1, i) => {
    let prefixI = _.concat(def1, []);
    _.forEach(definition, (def2, j) => {
      const prefixIJ = i !== j ? getPrefix(def1, def2) : prefixI;
      prefixI = prefixIJ.length > 0 ? prefixIJ : prefixI;
    });
    prefixes[i] = prefixI;
    prefixesNums[prefixI] = _.filter(_.concat(prefixesNums[prefixI], i), o => o !== undefined);
  });
  return [prefixes, prefixesNums];
}

const getPrefix = function(array1, array2) {
  return _.filter(array1, (value, i) => array1[i] === array2[i]);
}
