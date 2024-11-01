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

    const modThreeCases = [
      { initialState: 0, input: '0', expected: 0 },
      { initialState: 0, input: '1', expected: 1 },
      { initialState: 1, input: '0', expected: 2 },
      { initialState: 1, input: '1', expected: 0 },
      { initialState: 2, input: '0', expected: 1 },
      { initialState: 2, input: '1', expected: 2 },
    ];

    modThreeCases.forEach(({ initialState, input, expected }) => {
      test(`should end in ${expected} for input ${input} with initial state ${initialState}`, () => {
        modThreeFSM.setInitialState(initialState);
        modThreeFSM.processInput(input);
        expect(modThreeFSM.getCurrentState()).toBe(expected);
      });
    });

    test('should throw an error for an input character with no transition map', () => {
      expect(() => modThreeFSM.processInput('x')).toThrow(
        'No transition method defined'
      );
    });

    test('should start in initial state', () => {
      expect(modThreeFSM.getCurrentState()).toBe(0);
    });

    test('should end in initial state if input sequence is empty', () => {
      modThreeFSM.processInput('');
      expect(modThreeFSM.getCurrentState()).toBe(0);
    });

    test('should end in 0 for input sequence 110', () => {
      modThreeFSM.processInput('110');
      expect(modThreeFSM.getCurrentState()).toBe(0);
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

    test('should throw an error for an input character with no transition map', () => {
      expect(() => modThreeFSM.processInput('2')).toThrow(
        'No transition method defined'
      );
    });
  });

  // example turnstile FSM taken from https://en.wikipedia.org/wiki/Finite-state_machine#/media/File:Turnstile_state_machine_colored.svg
  describe('Turnstile FSM', () => {
    let turnstile;

    beforeEach(() => {
      turnstile = new FSM();

      turnstile.addState('locked');
      turnstile.addState('unlocked');

      turnstile.addTransition('locked', 'push', 'locked');
      turnstile.addTransition('locked', 'coin', 'unlocked');
      turnstile.addTransition('unlocked', 'push', 'locked');
      turnstile.addTransition('unlocked', 'coin', 'unlocked');

      turnstile.setInitialState('locked');
    });

    const turnstileCases = [
      { initialState: 'locked', input: ['push'], expected: 'locked' },
      { initialState: 'locked', input: ['coin'], expected: 'unlocked' },
      { initialState: 'unlocked', input: ['push'], expected: 'locked' },
      { initialState: 'unlocked', input: ['coin'], expected: 'unlocked' },
    ];

    turnstileCases.forEach(({ initialState, input, expected }) => {
      test(`should end in ${expected} for input ${input} with initial state ${initialState}`, () => {
        turnstile.setInitialState(initialState);
        turnstile.processInput(input);
        expect(turnstile.getCurrentState()).toBe(expected);
      });
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
