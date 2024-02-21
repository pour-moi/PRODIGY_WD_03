let boxes = document.querySelectorAll(".box");
let restart = document.querySelector(".restart");
let start = document.querySelector(".singlePlayer");
let main = document.querySelector(".main");
let intro = document.querySelector(".intro");
let firstName = document.querySelector(".firstName");
let playerX = document.querySelector(".player-x .name");
let newGame = document.querySelector(".newGame");
let cover = document.querySelector(".cover");

newGame.addEventListener("click", function () {
  intro.style.display = "flex";
  cover.style.display = "none";
});

start.addEventListener("click", function () {
  main.style.display = "flex";
  intro.style.display = "none";
  cover.style.display = "none";

  playerX.textContent = "Player";
});
function getComputerChoice(boxes) {
  let availableBoxes = Array.from(boxes).filter(
    (box) => box.querySelector(".xo").textContent === ""
  );
  return availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
}
function checkWinner() {
  const winningCombinations = [
    ["box1", "box2", "box3"],
    ["box1", "box4", "box7"],
    ["box1", "box5", "box9"],
    ["box2", "box5", "box8"],
    ["box3", "box5", "box7"],
    ["box3", "box6", "box9"],
    ["box4", "box5", "box6"],
    ["box7", "box8", "box9"],
  ];

  for (let combination of winningCombinations) {
    let [box1, box2, box3] = combination.map(
      (id) => document.querySelector(`.${id}`).textContent
    );
    if (box1 && box1 === box2 && box2 === box3) {
      return box1;
    }
  }
  return null;
}

boxes.forEach(function (box) {
  box.addEventListener("click", function () {
    let xo = this.querySelector(".xo");
    if (xo.textContent === "") {
      xo.textContent = "X";
      let computerBox = getComputerChoice(boxes);
      if (computerBox) {
        let computerXO = computerBox.querySelector(".xo");
        computerXO.textContent = "O";
      }
      let winner = checkWinner();
      if (winner) {
        let victory = document.querySelector(".winner");
        let container = document.querySelector(".container");
        container.classList.add("blur");
        victory.textContent = `${winner} won`;
        restart.style.display = "block";
        restart.textContent = "RESTART";
        clearBoxes();
      }
    }
  });
});
restart.addEventListener("click", function () {
  boxes.forEach(function (box) {
    let xo = box.querySelector(".xo");
    xo.textContent = "";
  });
  let victory = document.querySelector(".winner");
  victory.textContent = "";
  let container = document.querySelector(".container");
  container.classList.remove("blur");
  restart.style.display = "none";
});
