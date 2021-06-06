
var statusEl = document.getElementById('gameStatus')
var cells = document.getElementsByTagName('button');
var cellList = [].slice.call(cells);
var lastCell
var players = [];
var playersTurn = 0;
var turn = 0

//setup buttons to make move
cellList.forEach(function(cell) {
  cell.addEventListener('click', function() {
		lastCell = this;
    makeMove();
		this.disabled = true;
  });
})

var gameStatus = new Display(statusEl);

//setup players
players.push(player1 = new cpu('Bot', 'Δ'));
players.push(player2 = new human('Human', 'O'));

gameStatus.setName(players[0].name)
players[0].pickMove()

var gameStatus = new Display(statusEl);

function makeMove(spot) {
  //check if move is good
  lastCell.innerHTML = players[playersTurn].sym;
  lastCell.classList.add(players[playersTurn].sym);
  if (checkEndGame(players[playersTurn].sym)) {
    showWin();
  } else {
    changePlayer();
  }

}

function checkEndGame(sym) {
  board = getBoard()
  turn++
  cellsInRow = 0
  var wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (var i = 0; i < wins.length; i++) {
    wins[i].forEach(function(winCell) {
      board[winCell] === sym && cellsInRow++
    })
    if (cellsInRow === 3) {
      return true;
    } else {
      cellsInRow = 0;
    }
  }
  console.log(turn)
  if (turn === 9) {
    return true
  }
  return false;


}

function changePlayer() {
  playersTurn = playersTurn === 0 ? 1 : 0;
  gameStatus.setName(players[playersTurn].name)
  players[playersTurn].pickMove();

}

function getBoard() {
  var board = {};
  cellList.forEach(function(cell, i) {
    board[i] = cell.innerHTML;
  })
  return board;
}

//setup humans
function human(name, sym) {
  this.name = name;
  this.sym = sym;
  this.score = 0;

  this.pickMove = function() {
  }
}

//setup cpu
function cpu(name, sym) {
  this.name = name;
	this.sym = sym;
  this.score = 0;

	this.pickMove = function() {
    board = getBoard();
    randomMove = randomMove = Math.floor(Math.random() * 9);
    while(!this.checkMove(randomMove)){
      randomMove = randomMove = Math.floor(Math.random() * 9);
    }
    this.botClick(randomMove)
	}
  this.botClick = function(button){
    cellList[button].click();
  }
  this.checkMove = function(spot){
    board = getBoard();
    if (board[spot] === ""){
      return true
    }else{
      return false
    }
  }
}

function Display(item) {
  var elem = item;
  this.setText = function(text) {
    elem.innerHTML = text;
  }
	this.setName = function(name) {
		elem.innerHTML = 'It is the <p class="player">' + name + "'s</p> turn";
	}
}

function updateScore() {

}

function showWin() {
  alert('End Game');
}
