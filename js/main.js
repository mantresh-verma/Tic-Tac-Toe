let div = document.querySelectorAll(".col-4");
let btn = document.querySelector(".btn");
let arr = []; // for identify the moves and this containe runned moves. so these moves can't run again.
let playerO = "false";
let gameOver = "false";

let winnCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getRandomExcluding(min, max, exclusions) {
  let number;
  do {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclusions.includes(number)); // Check if the generated number is in the exclusions list
  return number;
}

let pos1, pos2, pos3;
let div1, div2, div3;
let checkWin = () => {
  for (let i = 0; i < winnCondition.length; i++) {
    let myArr = winnCondition[i];
    div1 = div[myArr[0]];
    div2 = div[myArr[1]];
    div3 = div[myArr[2]];

    pos1 = div1.innerText;
    pos2 = div2.innerText;
    pos3 = div3.innerText;
    if (pos1 === "O" && pos2 === "O" && pos3 === "O") {
      console.log("Winner is O");
      div1.style.background = "blue";
      div2.style.background = "blue";
      div3.style.background = "blue";
      gameOver = "true";
      disable();
      break;
    } else if (pos1 === "X" && pos2 === "X" && pos3 === "X") {
      console.log("Winner is X");
      div1.style.background = "red";
      div2.style.background = "red";
      div3.style.background = "red";
      gameOver = "true";
      disable();
      break;
    }
  }
};

// handle the computer move
function computerMove() {
  if (playerO === "true" && gameOver === "false") {
    let num = getRandomExcluding(0, 8, arr);
    div[num].innerText = "X";
    playerO = "false";
    arr.push(num);
    checkWin();
  }
}

// handle user move
function clickEvent(e) {
  let box = e.target;
  let boxId = parseInt(this.getAttribute("id")) - 1;

  if (box.innerText === "" && playerO === "false" && gameOver === "false") {
    box.innerText = "O";
    playerO = "true";
    arr.push(boxId);
    checkWin();
    if (gameOver === "false") setTimeout(computerMove, 0);
  }
}

div.forEach((box) => {
  box.addEventListener("click", clickEvent);
});

function disable() {
  for (let box of div) {
    box.removeEventListener("click", clickEvent);
    box.style.pointerEvents = "none";
  }
}



function enable() {
  for (let box of div) {
    box.innerText = "";
    box.style.pointerEvents = "auto";
    box.style.background = "";
    box.addEventListener("click", clickEvent);
    gameOver="false"
    playerO="false"
    arr=[]
  }
}

btn.addEventListener("click", enable);
