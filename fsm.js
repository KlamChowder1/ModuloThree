class FSM {
  constructor() {
    this.states = {};
    this.currentState = null;
  }

  /**
   * Setter for the initial state of the FSM
   * @param {string | number} state - the starting state for the FSM
   */
  setInitialState(state) {
    this.currentState = state;
  }

  /**
   * Getter for the current state of the FSM
   * @returns {string | number} - the current state
   */
  getCurrentState() {
    return this.currentState;
  }

  /**
   * Adds a state to the FSM
   * @param {string | number} stateName - the state that is part of the FSM
   */
  addState(stateName) {
    if (!this.states[stateName]) {
      this.states[stateName] = {};
    }
  }

  /**
   * Adds a transition mapping from the initial state to the final state
   * @param {string | number} initialState - the starting state
   * @param {string} input - the input character that causes a transition
   * @param {string | number} finalState - the final state
   */
  addTransition(initialState, input, finalState) {
    if (!this.states[initialState] || !this.states[finalState])
      throw new Error('State does not exist');
    this.states[initialState][input] = finalState;
  }

  /**
   * Processes the input for the FSM and updates the state
   * @param {string | string []} inputSequence - a string of input characters used for transitioning between states
   */
  processInput(inputSequence) {
    for (const input of inputSequence) {
      const transitionMap = this.states[this.currentState];
      if (!(input in transitionMap)) {
        throw new Error(`No transition method defined`);
      }
      this.currentState = transitionMap[input];
    }
  }
}

module.exports = FSM;
