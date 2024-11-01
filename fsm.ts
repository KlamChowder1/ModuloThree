class FSM {
  private states: Record<string, Record<string, string>> = {};
  private currentState: string;

  /**
   * Adds a state to the FSM
   * @param {string} stateName - the state that is part of the FSM
   */
  addState(stateName: string): void {
    if (!this.states[stateName]) {
      this.states[stateName] = {};
    }
  }

  /**
   * Adds a transition mapping from the initial state to the final state
   * @param {string} initialState - the starting state
   * @param {string} input - the input character that causes a transition
   * @param {string} finalState - the final state
   */
  addTransition(initialState: string, input: string, finalState: string): void {
    if (!this.states[initialState] || !this.states[finalState])
      throw new Error('State does not exist');
    this.states[initialState][input] = finalState;
  }

  /**
   * Sets the initial state of the FSM
   * @param {string} state - the starting state for the FSM
   */
  setInitialState(state: string): void {
    this.currentState = state;
  }

  /**
   * Processes the input for the FSM and updates the state
   * @param {string | string []} inputSequence - a string of input characters used for transitioning
   */
  processInput(inputSequence: string | string[]): void {
    for (const input of inputSequence) {
      const transitionMap = this.states[this.currentState];
      this.currentState = transitionMap[input];
    }
  }

  /**
   * Returns the current state of the FSM
   * @returns {string} - the current state
   */
  getCurrentState(): string {
    return this.currentState;
  }
}

let modThreeFSM;
modThreeFSM = new FSM();
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

modThreeFSM.processInput('110');

const test = modThreeFSM.getCurrentState();

console.log(test);

module.exports = FSM;
