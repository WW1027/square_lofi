export function greet(name) {
  return `Hello, ${name}`;
}

export const message = "How you doing?";


function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

export function generate_random_seq(dificulty, grid) {
  let sequence = [];
  let height = grid[0];
  let width = grid[1];
  for (let i = 0; i < dificulty; i++) {
      let x = generateRandomInteger(height) -1;
      let y = generateRandomInteger(width) -1;
      
      sequence.push([x,y])
  }
  return sequence;
}
