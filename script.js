const gameWindow = document.querySelector('#gameWindow');
const ctx = gameWindow.getContext('2d');

// Interface
let windowPixels = 625;
let startTail = 5;

// Implementation
gameWindow.width = gameWindow.height = windowPixels;
let tail = startTail;
let trail = [];

let velocityX = 0;
let velocityY = 0;

let positionX = 10;
let positionY = 10;

let squareX = Math.sqrt(gameWindow.width);
let squareY = Math.sqrt(gameWindow.height);

let pointX = Math.floor(Math.random() * squareX);
let pointY = Math.floor(Math.random() * squareY);


const chooseKey = (event) => {
  switch (event.keyCode) {
    case 37: //left way
      if (velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case 38: //top way
      if (velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
    case 39: //right way
      if (velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
    case 40: //down way
      if (velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
  }
}

const positionUpdate = () => {
  positionX += velocityX;
  positionY += velocityY;
}

const wrap = () => {
  if (positionX < 0) {
    positionX = squareX - 1;
  }
  if (positionX > squareX - 1) {
    positionX = 0;
  }
  if (positionY < 0) {
    positionY = squareY - 1;
  }
  if (positionY > squareY - 1) {
    positionY = 0;;
  }
}

const drawWindow = () => {
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, gameWindow.width, gameWindow.height)
}

const drawSnake = () => {
  ctx.fillStyle = 'lime';
  for (sign of trail) {
    ctx.fillRect(sign.x * squareX, sign.y * squareY, squareY - 2, squareY - 2);
    if (sign.x == positionX && sign.y == positionY) {
      tail = startTail;
    }
  }
}

const pushSign = () => {
  trail.push({
    x: positionX,
    y: positionY,
  })
}

const shifting = () => {
  while (trail.length > tail) {
    trail.shift();
  }
}

const getPoint = () => {
  if (positionX == pointX && positionY == pointY) {
    tail++;
    pointX = Math.floor(Math.random() * squareX);
    pointY = Math.floor(Math.random() * squareY);
  }
}

const drawNewPoint = () => {
  ctx.fillStyle = 'red';
  ctx.fillRect(pointX * squareX, pointY * squareY, squareY - 2, squareY - 2);
}
const game = () => {
  positionUpdate();
  wrap();
  drawWindow();
  drawSnake();
  pushSign();
  shifting();
  getPoint();
  drawNewPoint();
}

window.addEventListener('keydown', chooseKey)
// requestAnimationFrame(game);
setInterval(game, 1000 / 15)