//set Global variables needed for functions
let speed = Math.floor(Math.random() * 4 + 1);
let winGame = document.querySelector('.modal');
let yes = document.querySelector('.yes');
let no = document.querySelector('.no');
let close = document.querySelector('.close');

//set overall character class with attributes that will be needed by BOTH player and enemy
class Character {
    constructor() {
        this.sprite = 'images/';
        this.x = 200;
        this.y = 400;
        this.speed = speed;
    }
//setting boundaries in which player and enemies have to maintain position in
    update(dt) {
        this.boundariesX = this.x > 500;
        this.boundariesY = this.y < 40;
    }
//using render function to show and display the player and enemy
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
//setting the check collisions function for both player and enemy from the main constructor function
    checkCollisions(playerOrEnemy) {
        if (this.y >= playerOrEnemy.y - 45 && this.y <= playerOrEnemy.y + 45) {
            if (this.x >= playerOrEnemy.x - 45 && this.x <= playerOrEnemy.x + 45) {
                return true;
            }
        }
        else {
            return false;
        }
    }
}
//setting player sprite image, and update and render functions
class Player extends Character {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
        this.live = false;
        this.winner = false;
    }
//setting constant check to see if the player has made it to the water, and win game
    update(dt) {
        super.update();
        if (this.boundariesY && !this.live && !this.winner) {
            this.winner = true;
            youWon();
        }
    }
//setting to look for moving player to see if it is "live" in game
    render(){
        super.render();
        this.live = false;
    }
//the inputs to allow user to move player on the game board
    handleInput(input) {
        switch (input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 50 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 50 : this.y;
                break;
            case 'right':
                this.x = this.x < 400 ? this.x + 50 : this.x;
                break;
            case 'down':
                this.y = this.y < 400 ? this.y + 50 : this.y;
                break;
            default:
                break;
        }
        this.live = true;
    }
}
//setting up enemy class from main Character class
class Enemy extends Character {
    constructor(x, y) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed; 
    }
//setting the boundaries and speed for the enemies on the game board
    update(dt) {
        super.update();
        if (this.boundariesX) {
            this.x = -1;
        }
        else {
           this.x += this.speed * dt * 65;
        }
    }

}
//creating player and enemy variables to be used. set different starting positions for the enemy bugs
const player = new Player();
const enemyA = new Enemy(0, 55);
const enemyB = new Enemy(0, 125);
const enemyC = new Enemy(0, 215 );
const allEnemies = [enemyA, enemyB, enemyC]

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//setting the modal to display if the player has won the game. sets all function inside modal 
function youWon () {
    winGame.setAttribute('style','display:block');
    yes.addEventListener('click', function (y) {
        closePopup();
        window.location = window.location;
    })
    no.addEventListener('click', function(n) {
        closePopup();
    })
    close.addEventListener('click', function(){
        closePopup();
    })        
}
//function to restart game when the restart button is clicked
function restartGame () {
        window.location = window.location;
} 
//function to close popup window when game is won
function closePopup () {
    winGame.setAttribute('style', 'display: none');
}