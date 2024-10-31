function modThree(input) {
  let currState = 0;

  for (let i = 0; i < input.length; i++) {
    switch (currState) {
      case 0:
        if (input[i] === '0' ? (currState = 0) : (currState = 1));
        break;
      case 1:
        if (input[i] === '0' ? (currState = 2) : (currState = 0));
        break;
      case 2:
        if (input[i] === '0' ? (currState = 1) : (currState = 2));
        break;
    }
  }
  return currState;
}

const result = modThree('1010');
console.log(result);
