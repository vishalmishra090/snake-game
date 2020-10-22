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
let speedNo = 1;
let timerId = null;
let checkPlayAgain = false;

let snake = [];

let targetNode = {};

let eatAudio = new Audio("../audio/eat.wav");
let gameOverAudio = new Audio("../audio/gameOver.mp3");

function setGame() {
  snake[0] = {
    cssTop: 40,
    cssLeft: 48,
    nodeDirection: null,
  };

  targetNode.cssTop = null;
  targetNode.cssLeft = null;
  targetNode.nodeDirection = null;

  $("#gameArea").append(
    '<div id="targetNode" class="nodes"></div>',
    '<div class="nodes snakeNodes" id="node1" style="top: 40%; left: 48%; display: block;"></div>'
  );
  $("#speed").text(`x${speedNo}`);
  $("#score").text(`1`);
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
  prevCssTop = snake[0].cssTop;
  prevCssLeft = snake[0].cssLeft;
  $("#node1").css({
    top: snake[0].cssTop + UP + "%",
    left: snake[0].cssLeft + "%",
  });
  snake[0].cssTop += UP;
  snake[0].nodeDirection = "up";
}

function moveLeft() {
  prevCssTop = snake[0].cssTop;
  prevCssLeft = snake[0].cssLeft;
  $("#node1").css({
    top: snake[0].cssTop + "%",
    left: snake[0].cssLeft + LEFT + "%",
  });
  snake[0].cssLeft += LEFT;
  snake[0].nodeDirection = "left";
}

function moveRigth() {
  prevCssTop = snake[0].cssTop;
  prevCssLeft = snake[0].cssLeft;
  $("#node1").css({
    top: snake[0].cssTop + "%",
    left: snake[0].cssLeft + RIGHT + "%",
  });
  snake[0].cssLeft += RIGHT;
  snake[0].nodeDirection = "right";
}

function moveDown() {
  prevCssTop = snake[0].cssTop;
  prevCssLeft = snake[0].cssLeft;
  $("#node1").css({
    top: snake[0].cssTop + DOWN + "%",
    left: snake[0].cssLeft + "%",
  });
  snake[0].cssTop += DOWN;
  snake[0].nodeDirection = "down";
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
  for (let i = 1; i < totalNode; i++) {
    $("#node" + (i + 1)).css({
      top: prevCssTop + "%",
      left: prevCssLeft + "%",
    });
    nextCssTop = prevCssTop;
    nextCssLeft = prevCssLeft;
    prevCssTop = snake[i].cssTop;
    prevCssLeft = snake[i].cssLeft;
    changeNodeDirectionValue(
      nextCssTop,
      nextCssLeft,
      prevCssTop,
      prevCssLeft,
      i
    );
    snake[i].cssTop = nextCssTop;
    snake[i].cssLeft = nextCssLeft;
  }
}

function changeNodeDirectionValue(
  nextCssTop,
  nextCssLeft,
  prevCssTop,
  prevCssLeft,
  nodePosInArr
) {
  if (nextCssTop < prevCssTop) {
    snake[nodePosInArr].nodeDirection = "up";
  }
  if (nextCssTop > prevCssTop) {
    snake[nodePosInArr].nodeDirection = "down";
  }
  if (nextCssLeft < prevCssLeft) {
    snake[nodePosInArr].nodeDirection = "left";
  }
  if (nextCssLeft > prevCssLeft) {
    snake[nodePosInArr].nodeDirection = "right";
  }
}

// Add new Node

function addNewNode() {
  let frontNodeTop = snake[0].cssTop;
  let frontNodeLeft = snake[0].cssLeft;
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
    newNode();
    return;
  }
}

function newNode() {
  eatAudio.play();
  let lastNodeCssTop = snake[totalNode - 1].cssTop;
  let lastNodeCssLeft = snake[totalNode - 1].cssLeft;
  let lastNodeDirection = snake[totalNode - 1].nodeDirection;
  let newNodeCssTop = null;
  let newNodeCssLeft = null;
  if (lastNodeDirection == "up") {
    newNodeCssTop = lastNodeCssTop + 4;
    newNodeCssLeft = lastNodeCssLeft;
  }
  if (lastNodeDirection == "down") {
    newNodeCssTop = lastNodeCssTop - 4;
    newNodeCssLeft = lastNodeCssLeft;
  }
  if (lastNodeDirection == "left") {
    newNodeCssTop = lastNodeCssTop;
    newNodeCssLeft = lastNodeCssLeft + 4;
  }
  if (lastNodeDirection == "right") {
    newNodeCssTop = lastNodeCssTop;
    newNodeCssLeft = lastNodeCssLeft - 4;
  }
  $("#gameArea").append(
    `<div class="nodes snakeNodes" id="node${
      totalNode + 1
    }" style="top:${newNodeCssTop}%; left:${newNodeCssLeft}%;"></div>`
  );

  snake[totalNode] = {
    cssTop: newNodeCssTop,
    cssLeft: newNodeCssLeft,
    nodeDirection: lastNodeDirection,
  };
  totalNode++;
  $("#score").text(`${totalNode}`);
  changeTargetNodePos();
  changeSpeed();
}

// Speed

function changeSpeed() {
  if (totalNode % 7 == 0 && speed == 100 && speedNo == 4) {
    speed = speed + 50;
    $("#speed").text(`x${--speedNo}`);
  }
  if (totalNode % 5 == 0 && speed > 100) {
    speed = speed - 50;
    $("#speed").text(`x${++speedNo}`);
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
  addControl();
  $("#pause").one("click", function () {
    pauseGame();
  });
  timerId = setTimeout(run, speed);
}

$("#startGame").click(() => {
  $("#home-container").css("display", "none");
  $("main").css("display", "block");
  startGame();
});

$("#playAgain").click(() => playAgain());

function playAgain() {
  $("#playAgainBox").css("display", "none");
  $("#restartBox").css("display", "none");
  $("#gameArea").empty();
  $("#pause").off();
  totalNode = 1;
  direction = "up";
  lprevCssTop = null;
  prevCssLeft = null;
  nextCssTop = null;
  nextCssLeft = null;
  speed = 250;
  speedNo = 1;
  checkPlayAgain = false;
  startGame();
}

function showPlayAgain(timerId) {
  gameOverAudio.play();
  clearTimeout(timerId);
  $("#node1").css("display", "none");
  $("#pause").off();
  checkPlayAgain = true;
  setTimeout(function () {
    $("#playAgainBox").css("display", "block");
  }, 500);
}

function gameOver(timerId) {
  let firstNodeCssTop = snake[0].cssTop;
  let firstNodeCssLeft = snake[0].cssLeft;

  if (
    firstNodeCssTop > 96 ||
    firstNodeCssTop < 0 ||
    firstNodeCssLeft > 96 ||
    firstNodeCssLeft < 0
  ) {
    showPlayAgain(timerId);
    return true;
  }

  for (let i = 1; i < totalNode; i++) {
    if (
      firstNodeCssTop == snake[i].cssTop &&
      firstNodeCssLeft == snake[i].cssLeft
    ) {
      showPlayAgain(timerId);
      return true;
    }
  }
  return false;
}

function pauseGame() {
  $("#pause").off();
  removeControl();
  if (timerId != null) {
    clearTimeout(timerId);
  }
  $("#pause").one("click", function () {
    playGame();
  });
  $(document).off("keydown");
  $(document).on("keydown", function (event) {
    if (event.keyCode == 37) {
      direction = "left"; // ArrowLeft
      $(this).off();
      playGame();
    }
    if (event.keyCode == 38) {
      direction = "up"; // ArrowUp
      $(this).off();
      playGame();
    }
    if (event.keyCode == 39) {
      direction = "right"; //ArrowRight
      $(this).off();
      playGame();
    }
    if (event.keyCode == 40) {
      direction = "down"; // ArrowDown
      $(this).off();
      playGame();
    }
  });
  $("#pause").css("background-image", "url(../images/play.svg)");
}

function playGame() {
  $("#pause").off();
  $("#restartBox").css("display", "none");
  addControl();
  timerId = setTimeout(run, speed);
  $("#pause").one("click", function () {
      pauseGame();
    });
  $("#pause").css("background-image", "url(../images/pause.svg)");
}

function removeControl() {
  $("#up").off();
  $("#down").off();
  $("#left").off();
  $("#right").off();
  $(document).off("keydown");
}

function addControl() {
  $("#up").click(() => (direction = "up"));
  $("#down").click(() => (direction = "down"));
  $("#left").click(() => (direction = "left"));
  $("#right").click(() => (direction = "right"));
  $(document).off("keydown");
  $(document).on("keydown", function (event) {
    if (event.keyCode == 37) direction = "left"; // ArrowLeft
    if (event.keyCode == 38) direction = "up"; // ArrowUp
    if (event.keyCode == 39) direction = "right"; //ArrowRight
    if (event.keyCode == 40) direction = "down"; // ArrowDown
  });
}

function restartGame() {
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
  speedNo = 1;
  checkPlayAgain = false;
}

$("#up").click(() => (direction = "up"));
$("#down").click(() => (direction = "down"));
$("#left").click(() => (direction = "left"));
$("#right").click(() => (direction = "right"));
$("#restart").click(function () {
  if (checkPlayAgain == false) pauseGame();
  $("#restartBox").css("display", "block");
});

$("#ok").click(() => restartGame());
$("#cancle").click(() => {
  if (checkPlayAgain == false) playGame();
  $("#restartBox").css("display", "none");
});

/* sound */

function muteAudio() {
  $("#sound").css("background-image", "url(../images/sound-off.svg)");
  eatAudio.muted = true;
  gameOverAudio.muted = true;
  $("#sound").one("click", () => unmuteAudio());
}

function unmuteAudio() {
  $("#sound").css("background-image", "url(../images/sound-on.svg)");
  eatAudio.muted = false;
  gameOverAudio.muted = false;
  $("#sound").one("click", () => muteAudio());
}

$("#sound").one("click", () => muteAudio());


/* FullScreen */

let elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
  $("#fullscreen").css("display", "none");
   $("#none").css("display","none");
}

document.addEventListener("fullscreenchange", (event) => {
  if (document.fullscreenElement) {
     $("#fullscreen").css("display", "none");
     $("#none").css("display", "none");
  } else {
    $("#fullscreen").css("display", "inline-block");
    $("#none").css("display", "inline-block");
  }
});


$("#fullscreen").click(function () {
  openFullscreen();
});

