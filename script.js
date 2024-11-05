const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusMessage = document.getElementById("statusMessage");
const resetGameButton = document.getElementById("resetGameButton");
const resetScoreButton = document.getElementById("resetScoreButton");
const xWinsDisplay = document.getElementById("xWins");
const oWinsDisplay = document.getElementById("oWins");

let currentPlayer = "X";
let gameActive = true;
let boardState = Array(9).fill("");
let xWins = 0;
let oWins = 0;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    statusMessage.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    currentPlayer === "X" ? xWins++ : oWins++;
    updateScoreboard();
  } else if (boardState.every(cell => cell !== "")) {
    statusMessage.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    if (boardState[a] === currentPlayer && boardState[b] === currentPlayer && boardState[c] === currentPlayer) {
      highlightWinningCells([a, b, c]);
      return true;
    }
    return false;
  });
}

function highlightWinningCells(cellsToHighlight) {
  cellsToHighlight.forEach(index => {
    cells[index].classList.add("highlight");
  });
}

function updateScoreboard() {
  xWinsDisplay.textContent = xWins;
  oWinsDisplay.textContent = oWins;
}

function resetGame() {
  boardState.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "highlight");
  });
  currentPlayer = "X";
  gameActive = true;
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function resetScores() {
  xWins = 0;
  oWins = 0;
  updateScoreboard();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetGameButton.addEventListener("click", resetGame);
resetScoreButton.addEventListener("click", resetScores);

resetGame();
