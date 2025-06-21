const gameBoard = document.getElementById('game-board');
const gameResult = document.getElementById('game-result');
const resetButton = document.getElementById('reset');
let mode = 'human';
const modeSelectors = document.querySelectorAll('input[name="mode"]');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameOver = false;

modeSelectors.forEach(r => r.addEventListener('change', e => {
  mode = e.target.value;
  resetGame();
}));

function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.addEventListener('click', () => handleCellClick(i));
    gameBoard.appendChild(div);
  }
}

function handleCellClick(index) {
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  updateUI();
  if (checkWin(currentPlayer)) {
    gameResult.textContent = `${currentPlayer} wins!`;
    isGameOver = true;
  } else if (!board.includes('')) {
    gameResult.textContent = "It's a draw.";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (mode === 'computer' && currentPlayer === 'O' && !isGameOver) {
      computerMove();
    }
  }
}

function computerMove() {
  const available = board.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
  const randomIndex = available[Math.floor(Math.random() * available.length)];
  if (randomIndex !== undefined) {
    board[randomIndex] = 'O';
    updateUI();
    if (checkWin('O')) {
      gameResult.textContent = 'O wins!';
      isGameOver = true;
    } else if (!board.includes('')) {
      gameResult.textContent = "It's a draw.";
      isGameOver = true;
    } else {
      currentPlayer = 'X';
    }
  }
}

function updateUI() {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < 9; i++) {
    cells[i].textContent = board[i];
  }
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameOver = false;
  gameResult.textContent = '';
  createBoard();
}

function checkWin(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(combo => combo.every(index => board[index] === player));
}

// Initialize
resetButton.addEventListener('click', resetGame);
createBoard();
