var originalBoard;
const humanPlayer= 'O';
const aiPlayer = 'X';
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2]
]
const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
  let endgame = document.querySelector('.endgame');
  if (endgame.style.display !== "none") {
    endgame.style.display = "none";
  }
  originalBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}
function turnClick(square) {
console.log(square.target.id);
}