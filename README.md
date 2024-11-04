# Setup

- run `npm install`
- you can run the `fsm.js` file with `node fsm.js` from the root folder

- Example usage:

```
 let modThreeFSM;
 modThreeFSM = new FSM();
 modThreeFSM.addState(0);
 modThreeFSM.addTransition(0, '0', 0);
 modThreeFSM.setInitialState(0);
 modThreeFSM.processInput('0')

 expected return is 0
```

# Testing

- run `npm run test` in the root folder to run the tests in `fsm.test.js`
- I have added tests for another FSM (turnstile FSM) for an additional check that the fsm class is extendable

# Assumptions

1. Assume all input sequences are valid for the FSM created (the transition state exists in the FSM state mapping) - will throw an Error here, but just to state my assumption as well
2. Assume the input sequence is not greater than 10 characters / 10 elements in an array
3. Assume transitions only have one initial state, one input, and one final state (from the definition of an FSM)
4. Assume states are strings or numbers - future implementations would add a check for this
5. Assume transitions are strings or an array of strings - future implementations would add a check for this
6. Assume the input sequence matches the FSM being used (string for ModThree, array of strings for turnstile FSM) - future implementations would add a check for this / validate the input for the FSM
7. Assume the input sequence is not null
8. Assume current state is never null (always begins at a valid state)
9. Assume any language is okay to use, I chose JavaScript for simplicity but TypeScript would be more strongly typed (technically the methods in the fsm class accept any input other than string / number, and TypeScript would have helped with type checking)
