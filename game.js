const size_grid = [1, 2, 3, 4];
const dificulty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const dim_grids = [
  [2, 2],
  [3, 3],
  [4, 4],
  [4, 5],
];
let gameSquares = document.getElementById("game");
let board = document.getElementById("board");
let dificultyText = document.getElementById("dificulty");
let winTitle = document.createElement("div");
let gameLose = false;
let soundClick = new Audio("resources/drip.mp3");
let seq_player = []
let dif;

winTitle.classList.add("winner-button");
winTitle.classList.add("text-center");
winTitle.textContent = "Winnner 😼!!";

// Esta clase se eencarga de crear el grid y de cambiar su color
class Squares {
  constructor(divPadre, size) {
    this.size = size;
    this.divPadre = divPadre;
    this.speed = 1000;
    this.dificulty = dim_grids[size - 1][0] * dim_grids[size - 1][1];
    this.atribsOfSquares = ["col-3", "square"];
    this.squares = [];
  }
  crearGrid() {
    let listIds = this.generateListId(dim_grids[this.size - 1]);
    for (let i = 0; i < this.dificulty; i++) {
      let square = document.createElement("div");
      this.addAtribs(square, this.atribsOfSquares);
      square.setAttribute("id", listIds[i]);

      square.textContent = "";
      this.squares.push(square);
    }

    for (let i = 0; i < this.squares.length; i++) {
      this.divPadre.appendChild(this.squares[i]);
    }
  }
  addAtribs(square, addAtribs) {
    addAtribs.forEach((atrib) => {
      square.classList.add(atrib);
    });
  }

  changeColor(seq) {
    let changedSquares = [];
    for (let i = 0; i < seq.length; i++) {
      let idSquare = "" + seq[i][0] + "," + seq[i][1];
      changedSquares.push(document.getElementById(idSquare));
    }

    let sequenceIndex = 0;
    let timer = setInterval(() => {
      const square = changedSquares[sequenceIndex];
      console.log(square);
      square.classList.add("square-on");
      setTimeout(() => square.classList.remove("square-on"), this.speed / 2);
      sequenceIndex++;
      if (sequenceIndex > seq.length - 1 && gameLose == false) {
        clearInterval(timer);
      }
    }, this.speed);
  }

  generateListId(grid) {
    let height = grid[0];
    let width = grid[1];
    let arr = [];
    for (let i = 0; i < width; i++) {
      arr[i] = [];
      for (let j = 0; j < height; j++) {
        arr[i][j] = "" + i + "," + j;
      }
    }
    console.log("ARR", arr);
    console.log("FLAT", arr.flat(1));
    return arr.flat(1);
  }

  replaceAttrib(oldAtrib, newAtrib) {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].classList.remove(oldAtrib);
      this.squares[i].classList.add(newAtrib);
    }
  }
}

class SquareGame {
  constructor(size, dificulty) {
    this.size = size;
    this.buttonPlay;
    this.selectorLvl;
    this.selectorLvlValue;
    this.container;
    this.gameLose = false;
    this.square;
    this.seqRandom = generate_random_seq(dificulty, dim_grids[size - 1]);
    this.seqPlayer = [];
  }
  init_buttons() {
    this.buttonPlay = document.getElementById("play");
    this.selectorLvl = document.getElementById("selector");
    this.container = document.getElementById("game");
    this.selectorLvlValue = this.selectorLvl.value;
  }
  init_game() {
    console.log("play", this.seqRandom);
    // ajustamos el container
    this.adjustContainer(this.selectorLvl.value);

    this.square = new Squares(board, this.selectorLvl.value);
    console.log(this.selectorLvl);
    this.square.crearGrid();
    console.log(this.seqRandom);
    this.square.changeColor(this.seqRandom);
    this.buttonPlay.classList.add("disabled");
  }
  adjustContainer(value) {
    this.container.classList.remove("container2");
    console.log("VALUE", value)

    switch (value) {
      case '1':
        this.container.classList.add("container2");
        break;
      case '2':
        this.container.classList.add("container3");
        break;
      case '3':
        this.container.classList.add("container4");
        break;
      case '4':
        this.container.classList.add("container4");
        break;
    }
    
  }
}


let selector = document.getElementById("selector");
let val = selector.value
dif = Math.floor(Math.random() * (5 - 2) + 2);


const squareGame = new SquareGame(selector.value, dif);
console.log("RANDOM SEQ", squareGame.seqRandom);
squareGame.init_buttons();

squareGame.buttonPlay.addEventListener("click", function () {
  console.log("hola");
  squareGame.init_game();
  dificultyText.textContent = "Dificulty " + dif;
  let opcionPlayer = board.getElementsByTagName("div");
  console.log("nodes", opcionPlayer);
  for (let i = 0; i < opcionPlayer.length; i++) {
    opcionPlayer[i].addEventListener("click", function () {
      console.log("FFFF");
      opcionPlayer[i].classList.add("square-on");

      let idSquare = opcionPlayer[i].getAttribute("id");
      seq_player.push(idSquare);
      let win = checkSequence(seq_player, squareGame.seqRandom);
      soundClick.play();

      
      if (win) {
        dificultyText.appendChild(winTitle);
        gameLose = true;
        squareGame.buttonPlay.textContent="Refresh page"
      }
    });
  }
});


// FUNCTIONS
function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}

function generate_random_seq(dificulty, grid) {
  let sequence = [];
  let height = grid[0];
  let width = grid[1];
  console.log("GRID", grid, "DIFIVULTY", dificulty);
  for (let i = 0; i < dificulty; i++) {
    let x = generateRandomInteger(height) - 1;
    let y = generateRandomInteger(width) - 1;

    sequence.push([x, y]);
  }
  return sequence;
}
function checkSequence(player, random) {
  console.log(player);
  console.log(random);
  let iguales = true;
  for (let i = 0; i < random.length; i++) {
    if (player[i] != random[i]) iguales = false;
  }
  return iguales;
}

