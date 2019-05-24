import _ from 'lodash';
import { StateDFA } from './stateDFA';

export default class Parser {
  constructor(rules, input) {
    this.dfa = new StateDFA(rules);
    this.follows = { 'E\'': ['$'], 'E': ['$', '+'], 'T': ['$', '+', '*'], 'F': ['$', '+', '*'] };
    this.stack = [0];
    this.symbols = [];
    this.reductions = [];
    this.input = _.concat(input, ['$']);
  }

  getNextInput() {
    return this.input[0];
  }

  stackTop() {
    return _.last(this.stack);
  }

  shift() {
    this.stack.push(this.dfa.getState(this.stackTop()).getGoto(this.getNextInput()));
    this.symbols.push(this.input[0]);
    this.input = _.slice(this.input, 1);
  }

  reduce(rule) {
    const replace = rule.getRuleLHS();
    const compare = rule.getRuleRHS();
    while (this.symbols.length > 0 && _.last(this.symbols) == _.last(compare)) {
      this.symbols.pop();
      compare.pop();
      this.stack.pop();
    }
    const nextState = this.dfa.getState(this.stackTop()).getGoto(replace);
    if (nextState) {
      this.stack.push(nextState);
    }
    this.symbols.push(replace);
    this.reductions.push(rule.getRule());
  }

  getReductions() {
    return _.reverse(this.reductions);
  }

  trace() {
    console.log(this.stack);
    console.log(this.symbols);
    console.log(this.input);
  }

  parse() {
    if (this.getNextInput() !== '$' || this.stackTop() !== 0) {
      let reduceRule;
      if (_.reduce(this.dfa.getState(this.stackTop()).getEndProductions(), (res, p) => {
          if (_.includes(this.follows[p.getRuleLHS()], this.getNextInput())) {
            reduceRule = p;
            res = true;
          }
          return res;
      }, false)) {
        this.reduce(reduceRule);
      } else {
        this.shift();
      }
      this.parse();
    }
  }
}
