var canvas = document.getElementById('game'); // in your HTML this element appears as <canvas id="game-canvas"></canvas>
var context = canvas.getContext('2d');

function Block(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

var blocks = [];

blocks.push( new Block(100, 50, 10, 10));

Block.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Block.prototype.move = function () {
  // if y is equal to the lowest point on the canvas
  // stop the block from descending
  if(this.y > canvas.height - this.height) {
    this.y++;
    return this;
  } else {
    return this.y = canvas.height - this.height
  }
};

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(function (block) {
    block.draw().move();
  });
  requestAnimationFrame(gameLoop);
});
