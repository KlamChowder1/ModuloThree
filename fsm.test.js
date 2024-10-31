const FSM = require('./fsm');

describe('FSM Tests', () => {
  let modThreeFSM;

  beforeEach(() => {
    // Instantiate and configure the FSM for the "mod-three" example
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
  });

  test('should end in 0 for input sequence 110', () => {
    modThreeFSM.processInput('110');
    expect(modThreeFSM.getCurrentState()).toBe(0);
  });

  test('should end in 1 for input sequence 1010', () => {
    modThreeFSM.processInput('1010');
    expect(modThreeFSM.getCurrentState()).toBe(1);
  });
});
