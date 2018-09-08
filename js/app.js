// Enemies our player must avoid
const Enemy = function(level) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  // gives Enemy a random speed between a level of 1 and 4
  this.speed = (Math.trunc(Math.random() * 4)) + 1;
  // puts it on its assigned level
  this.y = 18 + (level) * 83;
  // starts it somewhere randomly so they don't all come at once
  this.x = -50 * (Math.trunc(Math.random() * 5));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x > 505) {
    this.x = -101;
  } else {
    this.x += this.speed * 60 * dt;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function() {
  this.sprite = 'images/char-boy.png';
  //starts in the bottom middle space
  this.x = 200;
  this.y = 350;
  this.update = function() {
    if (this.y == 18) {
      if (this.checker(levels[0])) {
        this.x = 200;
        this.y = 350;
      }
    } else if (this.y == 101) {
      if (this.checker(levels[1])) {
        this.x = 200;
        this.y = 350;
      }
    } else if (this.y == 184) {
      if (this.checker(levels[2])) {
        this.x = 200;
        this.y = 350;
      }
    } else if (this.y == -65) {
      // Checks if game has been won
      this.winFun();
    }
  };
  //render function just like for Enemy prototype
  this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  //takes keycode and checks which direction to move in before updating
  // x,y coordinates. Also makes sure player can't go off screen.
  this.handleInput = function(keycode) {
    if (!gameWon) {
      switch (keycode) {
        case 'left':
          if (this.x !== -2) {
            this.x -= 101;
            console.log(this.x + "," + this.y);
          }
          break;
        case 'right':
          if (this.x !== 402) {
            this.x += 101;
            console.log(this.x + "," + this.y);
          }
          break;
        case 'up':
          if (this.y !== -65) {
            this.y -= 83;
            console.log(this.x + "," + this.y);
          }
          break;
        default:
          if (this.y !== 350) {
            this.y += 83;
            console.log(this.x + "," + this.y);
          }
      }
    }
  }
  //checks if any enemies in a given array are touching the player
  this.checker = function(array) {
    for (let i = 0; i < 2; i++) {
      if ((array[i].x < this.x && array[i].x + 70 > this.x) || (array[i].x < this.x + 83 && array[i].x + 70 > this.x + 83)) {
        return true;
      }
    }
    return false;
  }
  // Shows that game has been won, shows modal
  this.winFun = function() {
    gameWon = true;
    document.getElementById('modal').style.display = 'block';
  }
};

// tells if game has been won or not
let gameWon = false;
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Makes an array that can tell which row each enemy is in,
// and makes sure there are two enemies per row.
// Each new Enemy is added to that levels and to allEnemies.
let levels = [];
for (let i = 0; i < 3; i++) {
  let levI = [];
  levels.push(levI);
  for (let x = 0; x < 2; x++) {
    let newEnemy = new Enemy(i);
    allEnemies.push(newEnemy);
    levI.push(newEnemy);
  }
}
// Place the player object in a variable called player
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