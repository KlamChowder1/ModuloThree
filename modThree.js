function modThree(input) {
  let currState = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '0' && currState === 0) {
      currState = 0;
    } else if (input[i] === '1' && currState === 0) {
      currState = 1;
    } else if (input[i] === '0' && currState === 1) {
      currState = 2;
    } else if (input[i] === '1' && currState === 1) {
      currState = 0;
    } else if (input[i] === '0' && currState === 2) {
      currState = 1;
    } else if (input[i] === '1' && currState === 2) {
      currState = 2;
    }
  }
  return currState;
}

const result = modThree('110');
console.log(result);
