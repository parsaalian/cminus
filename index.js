import _ from 'lodash';
import { terms, rules } from './js/definitions';
import { leftRecursionElimination, leftFactoring } from './js/ll1';

// console.log(leftRecursionElimination('statement-list', rules.get('statement-list')));
console.log(leftFactoring('var-declaration', rules.get('var-declaration')));
// console.log(leftFactoring('declaration-list', rules.get('declaration-list')));
// console.log(leftFactoring('var', rules.get('var')));
