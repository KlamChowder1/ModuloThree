class FSM {
  constructor() {
    this.states = {};
    this.currentState = null;
  }

  // const states = {
  //   0: {},
  //   1: {},
  //   2: {}
  // }
  addState(stateName) {
    if (!this.states[stateName]) {
      this.states[stateName] = {};
    }
  }

  //   const states = {
  //     0: {
  //         0: 0,
  //         1: 1,
  //     },
  //     1: {
  //         0: 2
  //         1: 0,
  //     },
  //     2: {
  //         0: 1,
  //         1: 2,
  //     }
  // }
  addTransition(initialState, input, finalState) {
    if (!this.states[initialState] || !this.states[finalState])
      throw new Error('State does not exist');
    this.states[initialState][input] = finalState;
  }

  setInitialState(state) {
    this.currentState = state;
  }

  processInput(inputSequence) {
    for (const input of inputSequence) {
      const transitionMap = this.states[this.currentState];
      this.currentState = transitionMap[input];
    }
  }

  getCurrentState() {
    return this.currentState;
  }
}

const modThreeFSM = new FSM();

modThreeFSM.addState(0);
modThreeFSM.addState(1);
modThreeFSM.addState(2);

modThreeFSM.addTransition(0, '0', 0);
modThreeFSM.addTransition(0, '1', 1);
modThreeFSM.addTransition(1, '0', 2);
modThreeFSM.addTransition(1, '1', 0);
modThreeFSM.addTransition(2, '0', 1);
modThreeFSM.addTransition(2, '1', 2);

modThreeFSM.setInitialState(0);

modThreeFSM.processInput('1010');

console.log(modThreeFSM.getCurrentState());

module.exports = FSM;
