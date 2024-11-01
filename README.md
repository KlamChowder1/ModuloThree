Setup

- run `tsc fsm.ts` in the root folder to compile into the `.ts` file into `.js`
- a `tsconfig.json` file could be added in the future, but I wanted to keep it simple

Testing

- run `npm run test` in the root folder to run the tests in `fsm.test.js`
- I have added tests for another FSM for an additional check that the fsm class is extendable

Assumptions

1. Assume all input sequences are valid for the FSM created (the transition state exists in the FSM state mapping)
2. Assume the input sequence is not greater than 100 characters / input elements
3. Assume transitions only have one initial state, one input, and one final state
4. Assume states are strings or numbers
5. Assume transitions are strings or an array of strings
6. Assume the input sequence matches the FSM being used (string for ModThree, array of strings for turnstile FSM) - future implementations would add a check for this / validate the input for the FSM
7. Assume the input sequence is not null
8. Assume current state is never null (always begins at a valid state)
