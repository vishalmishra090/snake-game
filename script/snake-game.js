$("#node0").css({
  top: "48%",
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
    nodeId: "node" + totalNode,
    cssTop: 48,
    cssLeft: 48,
    prevNode: null,
    nextNode: null,
  },
];

let targetNode = {
  nodeId: null,
  cssTop: null,
  cssLeft: null,
  prevNode: totalNode - 1,
  nextNode: null,
};

function changeTargetNodePos() {
  let rndmTop = Math.floor(Math.random() * 97);
  let rndmLeft = Math.floor(Math.random() * 97);
  $("#targetNode").css({
    csstop: rndmTop + "%",
    cssleft: rndmLeft + "%",
  });
  targetNode.cssTop = rndmTop;
  targetNode.cssLeft = rndmLeft;
}

function moveUp() {
   prevCssTop = snake[totalNode - 1].cssTop;
   prevCssLeft = snake[totalNode - 1].cssLeft;
   $("#node" + (totalNode - 1)).css({
     top: snake[totalNode - 1].cssTop + UP + "%",
     left: snake[totalNode - 1].cssLeft + "%",
   });
   snake[totalNode - 1].cssTop += UP;
   updatePrevNode();
}

function moveLeft() {
  prevCssTop = snake[totalNode - 1].cssTop;
  prevCssLeft = snake[totalNode - 1].cssLeft;
  $("#node" + (totalNode - 1)).css({
    top: snake[totalNode - 1].cssTop + "%",
    left: snake[totalNode - 1].cssLeft + LEFT + "%",
  });
  snake[totalNode - 1].cssLeft += LEFT;
  updatePrevNode();
}

function moveRigth() {
   prevCssTop = snake[totalNode - 1].cssTop;
   prevCssLeft = snake[totalNode - 1].cssLeft;
   $("#node" + (totalNode - 1)).css({
     top: snake[totalNode - 1].cssTop + "%",
     left: snake[totalNode - 1].cssLeft + RIGHT + "%",
   });
   snake[totalNode - 1].cssLeft += RIGHT;
   updatePrevNode();
}

function moveDown() {
  prevCssTop = snake[totalNode - 1].cssTop;
  prevCssLeft = snake[totalNode - 1].cssLeft;
  $("#node" + (totalNode - 1)).css({
    top: snake[totalNode - 1].cssTop + DOWN + "%",
    left: snake[totalNode - 1].cssLeft + "%",
  });
  snake[totalNode - 1].cssTop += DOWN;
  updatePrevNode();
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
}

function updatePrevNode() {
  for (let i = totalNode - 2; i >= 0; i++) {
    $("#node" + i).css({
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
  }, 200);
}

function gameOver(timerId){
    let cssTop = snake[totalNode-1].cssTop;
    let cssLeft = snake[totalNode-1].cssLeft;
    if(cssTop > 96 || cssTop < 0 || cssLeft > 96 || cssLeft < 0){
       clearInterval(timerId);
       setTimeout(function(){
           restart();
       },50);
    }
}

function restart(){
    $("#node0").css({
      top: "48%",
      left: "48%",
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

 $(document).on("keydown", function (event){
   if(event.keyCode == 38){
       $(this).off();
       startGame();
   }
 });


