// blocks are 100x80
// Enemies our player must avoid
const Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.speed = (Math.trunc(Math.random() * 10)) + 1;
  this.initLoc = Math.trunc(Math.random() * 3)
  let loc = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function() {
  this.sprite = 'images/char-princess-girl.png';
  this.initLoc = Math.trunc(Math.random() * 5);
  this.update = function() {

  };
  this.render = function() {

  };
  this.handleInput = function() {

  }
  // This class requires an update(), render() and
  // a handleInput() method.
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for (int i = 0; i < 7; i++) {
  allEnemies.push(new Enemy());
}
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});