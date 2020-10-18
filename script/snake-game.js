$("#node1").css({
  top: "40%",
  left: "48%",
});

let front = "null";
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

let snake = [
  {
    cssTop: 40,
    cssLeft: 48,
  },
];

let targetNode = {
  cssTop: null,
  cssLeft: null,
};

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

function addNewNode() {
  let frontNodeTop = snake[totalNode - 1].cssTop;
  let frontNodeLeft = snake[totalNode - 1].cssLeft;
  let targetNodeTop = targetNode.cssTop;
  let targetNodeLeft = targetNode.cssLeft;

  if (
    (frontNodeTop == targetNodeTop &&
      (frontNodeLeft == targetNodeLeft - 4 ||
        frontNodeLeft == targetNodeLeft + 4)) ||
    (frontNodeLeft == targetNodeLeft &&
      (frontNodeTop == targetNodeTop - 4 ||
        frontNodeTop == targetNodeTop + 4))
  ) {
    $("#gamebox").append(
      `<div class="nodes snakeNodes" id="node${totalNode + 1}" style="top:${targetNodeTop}%; left:${targetNodeLeft}%;"></div>`
    );
    totalNode++;
    snake[totalNode-1] = {}
    Object.assign(snake[totalNode-1],targetNode);
    
    changeTargetNodePos();
  }
}

function startGame() {
  $(document).on("keydown", function (event) {
    // console.log(event.keyCode);
    //   console.log(event.key);

    // ArrowLeft
    if (event.keyCode == 37) {
      direction = "left";
    }

    // ArrowUp
    if (event.keyCode == 38) {
      direction = "up";
    }

    // ArrowRight
    if (event.keyCode == 39) {
      direction = "right";
    }

    // ArrowDown
    if (event.keyCode == 40) {
      direction = "down";
    }
  });
  let timerId = setInterval(function () {
    moveSnake();
    gameOver(timerId);
  }, 250);
}

function gameOver(timerId) {
  let cssTop = snake[totalNode - 1].cssTop;
  let cssLeft = snake[totalNode - 1].cssLeft;
  if (cssTop > 96 || cssTop < 0 || cssLeft > 96 || cssLeft < 0) {
    $("#node" + totalNode).css("display", "none");
    clearInterval(timerId);
    setTimeout(function () {
      restart();
    }, 50);
  }
}

function restart() {
  $("#node1").css({
    top: "48%",
    left: "48%",
    display: "block",
  });
  snake[0].cssTop = 48;
  snake[0].cssLeft = 48;
  $(document).on("keydown", function (event) {
    if (event.keyCode == 38) {
      $(this).off();
      startGame();
    }
  });
}

$(document).on("keydown", function (event) {
  if (event.keyCode == 38) {
    $(this).off();
    changeTargetNodePos();
    startGame();
  }
});
