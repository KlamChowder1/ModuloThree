var FSM = /** @class */ (function () {
    function FSM() {
        this.states = {};
    }
    /**
     * Adds a state to the FSM
     * @param {string} stateName - the state that is part of the FSM
     */
    FSM.prototype.addState = function (stateName) {
        if (!this.states[stateName]) {
            this.states[stateName] = {};
        }
    };
    /**
     * Adds a transition mapping from the initial state to the final state
     * @param {string} initialState - the starting state
     * @param {string} input - the input character that causes a transition
     * @param {string} finalState - the final state
     */
    FSM.prototype.addTransition = function (initialState, input, finalState) {
        if (!this.states[initialState] || !this.states[finalState])
            throw new Error('State does not exist');
        this.states[initialState][input] = finalState;
    };
    /**
     * Sets the initial state of the FSM
     * @param {string} state - the starting state for the FSM
     */
    FSM.prototype.setInitialState = function (state) {
        this.currentState = state;
    };
    /**
     * Processes the input for the FSM and updates the state
     * @param {string | string []} inputSequence - a string of input characters used for transitioning
     */
    FSM.prototype.processInput = function (inputSequence) {
        for (var _i = 0, inputSequence_1 = inputSequence; _i < inputSequence_1.length; _i++) {
            var input = inputSequence_1[_i];
            var transitionMap = this.states[this.currentState];
            this.currentState = transitionMap[input];
        }
    };
    /**
     * Returns the current state of the FSM
     * @returns {string} - the current state
     */
    FSM.prototype.getCurrentState = function () {
        return this.currentState;
    };
    return FSM;
}());
var modThreeFSM;
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
var test = modThreeFSM.getCurrentState();
console.log(test);
module.exports = FSM;
