const UP = -4;
const LEFT = -4;
const DOWN = +4;
const RIGHT = +4;
let totalNode = 1;
let direction = "up";
let prevCssTop = null;
let prevCssLeft = null;
let nextCssTop = null;
let nextCssLeft = null;
let speed = 250;
let timerId = null

let snake = [];

let targetNode = {};

function setGame() {
  snake[0] = {
    cssTop: 40,
    cssLeft: 48,
  };

  targetNode.cssTop = null;
  targetNode.cssLeft = null;

  $("#gameArea").append(
    '<div id="targetNode" class="nodes"></div>',
    '<div class="nodes snakeNodes" id="node1" style="top: 40%; left: 48%; display: block;"></div>'
  );
}

function changeTargetNodePos() {
  let rndmTop = Math.floor(Math.random() * 25);
  let rndmLeft = Math.floor(Math.random() * 25);
  $("#targetNode").css({
    top: rndmTop * 4 + "%",
    left: rndmLeft * 4 + "%",
  });
  targetNode.cssTop = rndmTop * 4;
  targetNode.cssLeft = rndmLeft * 4;
}

// Snake move

function moveUp() {
  prevCssTop = snake[totalNode - 1].cssTop;
  prevCssLeft = snake[totalNode - 1].cssLeft;
  $("#node" + totalNode).css({
    top: snake[totalNode - 1].cssTop + UP + "%",
    left: snake[totalNode - 1].cssLeft + "%",
  });
  snake[totalNode - 1].cssTop += UP;
}

function moveLeft() {
  prevCssTop = snake[totalNode - 1].cssTop;
  prevCssLeft = snake[totalNode - 1].cssLeft;
  $("#node" + totalNode).css({
    top: snake[totalNode - 1].cssTop + "%",
    left: snake[totalNode - 1].cssLeft + LEFT + "%",
  });
  snake[totalNode - 1].cssLeft += LEFT;
}

function moveRigth() {
  prevCssTop = snake[totalNode - 1].cssTop;
  prevCssLeft = snake[totalNode - 1].cssLeft;
  $("#node" + totalNode).css({
    top: snake[totalNode - 1].cssTop + "%",
    left: snake[totalNode - 1].cssLeft + RIGHT + "%",
  });
  snake[totalNode - 1].cssLeft += RIGHT;
}

function moveDown() {
  prevCssTop = snake[totalNode - 1].cssTop;
  prevCssLeft = snake[totalNode - 1].cssLeft;
  $("#node" + totalNode).css({
    top: snake[totalNode - 1].cssTop + DOWN + "%",
    left: snake[totalNode - 1].cssLeft + "%",
  });
  snake[totalNode - 1].cssTop += DOWN;
}

function moveSnake() {
  if (direction == "up") {
    moveUp();
  }

  if (direction == "left") {
    moveLeft();
  }

  if (direction == "right") {
    moveRigth();
  }

  if (direction == "down") {
    moveDown();
  }

  updatePrevNode();
  addNewNode();
}

// Update Previous Node Css

function updatePrevNode() {
  for (let i = totalNode - 2; i >= 0; i--) {
    $("#node" + (i + 1)).css({
      top: prevCssTop + "%",
      left: prevCssLeft + "%",
    });
    nextCssTop = prevCssTop;
    nextCssLeft = prevCssLeft;
    prevCssTop = snake[i].cssTop;
    prevCssLeft = snake[i].cssLeft;
    snake[i].cssTop = nextCssTop;
    snake[i].cssLeft = nextCssLeft;
  }
}

// Add new Node

function addNewNode() {
  let frontNodeTop = snake[totalNode - 1].cssTop;
  let frontNodeLeft = snake[totalNode - 1].cssLeft;
  let targetNodeTop = targetNode.cssTop;
  let targetNodeLeft = targetNode.cssLeft;

  if (
    ((direction == "up" && frontNodeTop == targetNodeTop) ||
      (direction == "down" && frontNodeTop == targetNodeTop)) &&
    frontNodeLeft == targetNodeLeft
  ) {
    newNode(targetNodeTop, targetNodeLeft);
    return;
  }

  if (
    ((direction == "left" && frontNodeLeft == targetNodeLeft) ||
      (direction == "right" && frontNodeLeft == targetNodeLeft)) &&
    frontNodeTop == targetNodeTop
  ) {
    newNode(targetNodeTop, targetNodeLeft);
    return;
  }
}

function newNode(targetNodeTop, targetNodeLeft) {
  if (direction == "up") {
    targetNodeTop = targetNodeTop - 4;
  }
  if (direction == "down") {
    targetNodeTop = targetNodeTop + 4;
  }
  if (direction == "left") {
    targetNodeLeft = targetNodeLeft - 4;
  }
  if (direction == "right") {
    targetNodeLeft = targetNodeLeft + 4;
  }
  $("#gameArea").append(
    `<div class="nodes snakeNodes" id="node${
      totalNode + 1
    }" style="top:${targetNodeTop}%; left:${targetNodeLeft}%;"></div>`
  );
  totalNode++;
  snake[totalNode - 1] = {
    cssTop: targetNodeTop,
    cssLeft: targetNodeLeft,
  };
  changeTargetNodePos();
  increaseSpeed();
}

// Speed

function increaseSpeed() {
  if (totalNode % 5 == 0 && speed > 50) {
    speed = speed - 50;
  }
}

// Settings

function run() {
  moveSnake();
  if (gameOver(timerId)) {
    return;
  }
  timerId = setTimeout(run, speed);
}

function startGame() {
  setGame();
  changeTargetNodePos();
  $(document).on("keydown", function (event) {
    if (event.keyCode == 37) direction = "left"; // ArrowLeft
    if (event.keyCode == 38) direction = "up"; // ArrowUp
    if (event.keyCode == 39) direction = "right"; //ArrowRight
    if (event.keyCode == 40) direction = "down"; // ArrowDown
  });
  $("#pause").one("click", function () {
    pauseGame();
  });

   timerId = setTimeout(run, speed);
}

$("#startGame").click(() => {
  $("#home-container").css("display","none");
  $("main").css("display", "block");
  startGame();
});

$("#playAgain").click(() => playAgain());

function playAgain() {
  $("#playAgainBox").css("display", "none");
  $("#restartBox").css("display", "none");
  $("#gameArea").empty();
   totalNode = 1;
   direction = "up";
   lprevCssTop = null;
   prevCssLeft = null;
   nextCssTop = null;
   nextCssLeft = null;
   speed = 250;
   startGame();
}

function gameOver(timerId) {
  let firstNodeCssTop = snake[totalNode - 1].cssTop;
  let firstNodeCssLeft = snake[totalNode - 1].cssLeft;

  if (
    firstNodeCssTop > 96 ||
    firstNodeCssTop < 0 ||
    firstNodeCssLeft > 96 ||
    firstNodeCssLeft < 0
  ) {
    clearTimeout(timerId);
    $("#node" + totalNode).css("display", "none");
    setTimeout(function () {
      $("#playAgainBox").css("display","block");
    }, 500);
    return true;
  }

  for (let i = totalNode - 2; i >= 0; i--) {
    if (
      firstNodeCssTop == snake[i].cssTop &&
      firstNodeCssLeft == snake[i].cssLeft
    ) {
      clearTimeout(timerId);
      setTimeout(function () {
        $("#playAgainBox").css("display", "block");
      }, 500);
      return true;
    }
  }
  return false;
}

function pauseGame(){
    if(timerId != null){
        clearTimeout(timerId);
    }
    $("#pause").one("click", function(){
        playGame();
    })
}

function playGame(){
    timerId = setTimeout(run, speed);
    $("#pause").one("click", function () {
      pauseGame();
    });
}

function restartGame(){
    $("main").css("display", "none");
    $("#playAgainBox").css("display", "none");
    $("#restartBox").css("display", "none");
    $("#home-container").css("display", "block");
    $("#pause").off();
    $("#gameArea").empty();
    totalNode = 1;
    direction = "up";
    lprevCssTop = null;
    prevCssLeft = null;
    nextCssTop = null;
    nextCssLeft = null;
    speed = 250;
}


$("#up").click(()=> (direction = "up"));
$("#down").click(() => (direction = "down"));
$("#left").click(() => (direction = "left"));
$("#right").click(() => (direction = "right"));
$("#restart").click(function(){
    pauseGame();
    $("#restartBox").css("display","block")
});

$("#ok").click(() => restartGame());
$("#cancle").click(() => {
    playGame();
    $("#restartBox").css("display", "none")
});

