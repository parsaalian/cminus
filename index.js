import { first } from './js/ll1';

console.log(first('program'));


import { terms, rules } from './js/definitions';
import { leftRecursionElimination } from './js/ll1';

console.log(leftRecursionElimination('statement-list', rules.get('statement-list')));
