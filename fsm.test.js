const FSM = require('./fsm');

describe('FSM Tests', () => {
  describe('Mod Three FSM', () => {
    let modThreeFSM;

    beforeEach(() => {
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
    test('should start in initial state', () => {
      expect(modThreeFSM.getCurrentState()).toBe(0);
    });
    test('should end in initial state if input sequence is empty', () => {
      modThreeFSM.processInput('');
      expect(modThreeFSM.getCurrentState()).toBe(0);
    });
    // 0
    test('should end in 0 for input sequence 0', () => {
      modThreeFSM.setInitialState(0);
      modThreeFSM.processInput('0');
      expect(modThreeFSM.getCurrentState()).toBe(0);
    });
    test('should end in 1 for input sequence 1', () => {
      modThreeFSM.setInitialState(0);
      modThreeFSM.processInput('1');
      expect(modThreeFSM.getCurrentState()).toBe(1);
    });

    // 1
    test('should end in 2 for input sequence 0', () => {
      modThreeFSM.setInitialState(1);
      modThreeFSM.processInput('0');
      expect(modThreeFSM.getCurrentState()).toBe(2);
    });
    test('should end in 0 for input sequence 1', () => {
      modThreeFSM.setInitialState(1);
      modThreeFSM.processInput('1');
      expect(modThreeFSM.getCurrentState()).toBe(0);
    });

    // 2
    test('should end in 1 for input sequence 0', () => {
      modThreeFSM.setInitialState(2);
      modThreeFSM.processInput('0');
      expect(modThreeFSM.getCurrentState()).toBe(1);
    });

    test('should end in 2 for input sequence 1', () => {
      modThreeFSM.setInitialState(2);
      modThreeFSM.processInput('1');
      expect(modThreeFSM.getCurrentState()).toBe(2);
    });

    test('should end in 1 for input sequence 1010', () => {
      modThreeFSM.processInput('1010');
      expect(modThreeFSM.getCurrentState()).toBe(1);
    });

    test('should throw an error if adding an inital transition state that has not been added to the FSM states', () => {
      expect(() => modThreeFSM.addTransition(3, '1', 0)).toThrow(
        'State does not exist'
      );
    });

    test('should throw an error if adding in a final transition state that has not been added to the FSM states', () => {
      expect(() => modThreeFSM.addTransition(1, '0', 3)).toThrow(
        'State does not exist'
      );
    });
  });

  describe('Turnstile FSM', () => {
    let turnstile;

    beforeEach(() => {
      // example FSM taken from https://en.wikipedia.org/wiki/Finite-state_machine#/media/File:Turnstile_state_machine_colored.svg
      turnstile = new FSM();

      turnstile.addState('locked');
      turnstile.addState('unlocked');

      turnstile.addTransition('locked', 'push', 'locked');
      turnstile.addTransition('locked', 'coin', 'unlocked');
      turnstile.addTransition('unlocked', 'push', 'locked');
      turnstile.addTransition('unlocked', 'coin', 'unlocked');

      turnstile.setInitialState('locked');
    });

    test('should start in initial state', () => {
      expect(turnstile.getCurrentState()).toBe('locked');
    });

    test('should end in initial state if input sequence is empty', () => {
      turnstile.processInput('');
      expect(turnstile.getCurrentState()).toBe('locked');
    });

    test('should end in `unlocked` for input sequence [`coin`]', () => {
      turnstile.processInput(['coin']);
      expect(turnstile.getCurrentState()).toBe('unlocked');
    });

    test('should end in `locked` for input sequence [`coin`, `coin`, `push`]', () => {
      turnstile.processInput(['coin', 'coin', 'push']);
      expect(turnstile.getCurrentState()).toBe('locked');
    });
  });
});
