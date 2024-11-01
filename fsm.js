class FSM {
  constructor() {
    this.states = {};
    this.currentState = null;
  }

  /**
   * Adds a state to the FSM
   * @param {any} stateName - the state that is part of the FSM
   */
  addState(stateName) {
    if (!this.states[stateName]) {
      this.states[stateName] = {};
    }
  }

  /**
   * Adds a transition mapping from the initial state to the final state
   * @param {any} initialState - the starting state
   * @param {string} input - the input character that causes a transition
   * @param {any} finalState - the final state
   */
  addTransition(initialState, input, finalState) {
    if (!this.states[initialState] || !this.states[finalState])
      throw new Error('State does not exist');
    this.states[initialState][input] = finalState;
  }

  /**
   * Sets the initial state of the FSM
   * @param {any} state - the starting state for the FSM
   */
  setInitialState(state) {
    this.currentState = state;
  }

  /**
   * Processes the input for the FSM and updates the state
   * @param {string} inputSequence - a string of input characters used for transitioning
   */
  processInput(inputSequence) {
    for (const input of inputSequence) {
      const transitionMap = this.states[this.currentState];
      this.currentState = transitionMap[input];
    }
  }

  /**
   * Returns the current state of the FSM
   * @returns {any} - the current state
   */
  getCurrentState() {
    return this.currentState;
  }
}

module.exports = FSM;
