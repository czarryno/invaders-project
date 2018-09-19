const WIDTH = 640;
const HEIGHT = 480;

/** create first canvas and context*/
var screen = document.createElement("canvas");
var screenContext = screen.getContext("2d");
screen.height = HEIGHT;
screen.width = WIDTH;
document.body.appendChild(screen);

/** create back canvas and context*/
var backBuffer = document.createElement("canvas");
var backBufferContext = screen.getContext("2d");
backBuffer.height = HEIGHT;
backBuffer.width = WIDTH;

/** Variables that start game and show input*/
var start = null;
var currentInput = {
	space: false,
	left: false,
	right: false,
	up: false,
	down: false,
	q:false
}
var priorInput = {
	space: false,
	left: false,
	right: false,
	up: false,
	down: false,
	q: false
}
var playerX = 298;
var playerY = 435;
var enemies = [];
var playerBulletsArray = [];
var enemyBulletsArray = [];

/** @function window.onload
  * Creates enemies and shows score on window loading
  */
window.onload = function(){
	createEnemies();
	updateLives();
}
/** @constructor Enemy
  * Enemy Constructor
  * @param {int} - the x coordinate
  * @param {int} - the y coordinate
  * @param {int} - the width
  * @param {int} - the height
  */
var enemyVelocity = 1;
function Enemy(x, y, width, height){
	this.x = x; this.y = y; this.width = width; this.height = height;
}

/** @prototype Enemy.prototype.create
  * Shows Enemies on canvas
  * @param {int} - the x coordinate
  * @param {int} - the y coordinate
  * @param {int} - the width
  * @param {int} - the height
  */
Enemy.prototype.create = function(x, y, width, height){
		backBufferContext.fillStyle = "#0000ff";
		backBufferContext.fillRect(this.x, this.y, 20, 20);
		this.x += elapsedTime/10 * enemyVelocity;
		if(this.y >= 460){
			gameEnd = true;
		}
		else{
			if(this.x > 620){
				for(var i = 0; i < enemies.length; i++){
					enemies[i].y += 20;
				}
				enemyVelocity = -enemyVelocity;
			}
			if(this.x < 0){
				for(var j = 0; j < enemies.length; j++){
					enemies[j].y += 20;
				}
				enemyVelocity = -enemyVelocity;
			}
		}
}
/** @function createEnemies
  * creates 10 enemies and pushes in to array
  */
function createEnemies(){
	if(enemies.length < 9){
		for(var i = 1; i < 6; i++){
			for(var j = 1; j < 3; j++){
				var newEnemy = new Enemy(i*100, 50*j, 20, 20);
				enemies.push(newEnemy);
			}
		}
	}
}
/** @constructor playerBullets
  * Player Bullet Constructor
  * @param {int} - the x coordinate
  * @param {int} - the y coordinate
  * @param {int} - the width
  * @param {int} - the height
  */
function playerBullets(x, y, h, w){
	this.x = x; this.y = y; this.h = h; this.w = w;
}
/** @prototype playerBullets.prototype.create
  * Displays player bullets on canvas
  * @param {int} - the x coordinate
  * @param {int} - the y coordinate
  * @param {int} - the width
  * @param {int} - the height
  */
playerBullets.prototype.create = function(x, y, w, h){
	backBufferContext.fillStyle = "#000000";
	backBufferContext.fillRect(this.x, this.y, this.h, this.w);
	this.y -= elapsedTime;
	editBulletArray(this);
	checkForEnemyHit(this);
}
/** @constructor enemyBullets
  * Enemy Bullets Constructor
  * @param {int} - the x coordinate
  * @param {int} - the y coordinate
  * @param {int} - the width
  * @param {int} - the height
  */
function enemyBullets(x, y, h, w){
	this.x = x; this.y = y; this.h = h; this.w = w;
}
/** @prototype enemyBullets.prototype.create
  * Displays enemy bullets on canvas
  * @param {int} - the x coordinate
  * @param {int} - the y coordinate
  * @param {int} - the width
  * @param {int} - the height
  */
enemyBullets.prototype.create = function(x, y, w, h){
		backBufferContext.fillStyle = "#000000";
		backBufferContext.fillRect(this.x, this.y, this.h, this.w);
		this.y += 10;
		editEnemyBulletArray(this);
		checkForPlayerHit(this);
}
/** @function editEnemyBulletArray
  * splices enemy bullet array if bullet goes off screen
  * @param {enemyBullets} - the instantiation of the enemy bullet
  */
function editEnemyBulletArray(bullet){
	if(bullet.y > 480){
		enemyBulletsArray.splice(enemyBulletsArray.indexOf(this), 1);
	}
}

/** @function editBulletArray
  * splices player bullet array if bullet goes off screen
  * @param {playerBullets} bullet- the instantiation of the player bullet
  */
function editBulletArray(bullet){
	if(bullet.y < 0){
		playerBulletsArray.splice(playerBulletsArray.indexOf(this), 1);
	}
}
/** @function handleKeydown
  * Event handler for keydown events
  * @param {KeyEvent} event - the keydown event
  */
function keyDownHandler(event){
	switch(event.key){
		case ' ':
		console.log("true")
			currentInput.space = true;
			break;
		case 'ArrowUp':
		case 'w':
			currentInput.up = true;
			break;
		case 'ArrowDown':
		case 's':
			currentInput.down = true;
			break;
		case 'ArrowLeft':
		case 'a':
			currentInput.left = true;
			break;
		case 'ArrowRight':
		case 'd':
			currentInput.right = true;
			break;
		case 'q':
			currentInput.q = true;
			break;
	}	
}
// Attach keyup event handler to the window
window.addEventListener('keydown', keyDownHandler);

/** @function handleKeyup
  * Event handler for keyup events
  * @param {KeyEvent} event - the keyup event
  */
function keyUpHandler(event){
	switch(event.key){
		case ' ':
			console.log("false")
			currentInput.space = false;
			break;
		case 'ArrowUp':
		case 'w':
			currentInput.up = false;
			break;
		case 'ArrowDown':
		case 's':
			currentInput.down = false;
			break;
		case 'ArrowLeft':
		case 'a':
			currentInput.left = false;
			break;
		case 'ArrowRight':
		case 'd':
			currentInput.right = false;
			break;
		case 'q':
			currentInput.q = false;
			break;
	}		
}

//game end state variable
var gameEnd = false;

// Attach keyup event handler to the window
window.addEventListener('keyup', keyUpHandler);

//count variable that allows random bullet to be shot every 50 iterations of the loop
var count = 0;

/** @function loop
  * The main game loop
  * @param {timestamp} timestamp - the current system time,
  * in milliseconds, expressed as a double.
  */
function loop(timestamp){
	if(gameEnd === false){
		if(!start) start = timestamp;
		elapsedTime = timestamp - start;
		start = timestamp;
		pollInput();
		update(elapsedTime);
		render(elapsedTime);
		window.requestAnimationFrame(loop);
		if(count % 50 === 0){
			enemyShooting();
		}
		count++;
	}
	else{
		screenContext.clearRect(0,0,WIDTH,HEIGHT);
		screenContext.font = "30px Arial";
		screenContext.fillStyle = "#0000ff";
		screenContext.fillText("Game Over!", 100, 240);
		screenContext.fillText("Press Q to Play Again", 100, 300);
		window.requestAnimationFrame(loop);
		if(currentInput.q){
			score = 0;
			lives = 3;
			playerX = 298;
			playerY = 435;
			playerBulletsArray = [];
			enemyBulletsArray = [];
			enemies = [];
			window.onload();
			gameEnd = false;
		}
	}
}
/** @function pollInput
  * Copies the current input into the previous input
  */
function pollInput(){
	priorInput = JSON.parse(JSON.stringify(currentInput));
	if(priorInput.space){
		console.log("priorInput")
	}
}
/** @function update
  * Updates the game's state
  * @param {double} elapsedTime - the amount of time
  * elapsed between frames
  */
function update(elapsedTime){ 
	if(priorInput.space){
		var newBullet = new playerBullets(playerX+20, playerY, 5,5);
		playerBulletsArray.push(newBullet);
	}
	if(currentInput.up){
		playerY -= 0.25 * elapsedTime;
		if(playerY < -8){
			playerY = -8;
		}
	}
	if(currentInput.down){
		playerY += 0.25 * elapsedTime;
		if(playerY > 445){
			playerY = 445;
		}
	}
	if(currentInput.left){
		playerX -= 0.25 * elapsedTime;
		if(playerX < -10){
			playerX = 620;
		}
	}
	if(currentInput.right){
		playerX += 0.25 * elapsedTime;
		if(playerX > 620){
			playerX = -10;
		}
	}
	
}
/** @function render
  * Renders the game into the canvas
  * @param {double} elapsedTime - the amount of time
  * elapsed between frames
  */
function render(elapsedTime){
	backBufferContext.clearRect(0,0,WIDTH,HEIGHT);
	backBufferContext.fillStyle = "#00ff00";
	backBufferContext.fillRect(10+playerX, 10+playerY, 20, 20);
	enemies.forEach(function(enemy){
		enemy.create();
	})
	
	playerBulletsArray.forEach(function(bullet){
		bullet.create();
	})
	enemyBulletsArray.forEach(function(bullets){
		bullets.create();
	})
	//enemies.update();
	screenContext.font = "10px Arial";
	backBufferContext.fillStyle = "#0000ff";
	backBufferContext.fillText("Score: " + score, 0, 10);
	screenContext.font = "10px Arial";
	backBufferContext.fillStyle = "#0000ff";
	backBufferContext.fillText("Lives: " + lives, 0, 20);
	screenContext.drawImage(backBuffer, 0, 0);
}

//player score tracket
var score = 0;

/** @function checkForEnemyHit
  * checks if enemy has been hit by player bullet
  * @param {playerBullets} bullet - instantiation of playerBullets
  */
function checkForEnemyHit(bullet){
	enemies.forEach(function(enemy){
		if(this.x < enemy.x + 20 && this.x + 10 > enemy.x && this.y < enemy.y + 20 
				&& this.y + 10 > enemy.y){
		playerBulletsArray.splice(playerBulletsArray.indexOf(this), 1);
		enemies.splice(enemies.indexOf(enemy), 1);
		score += 10;
		}
	}, bullet) ;
	if(enemies.length === 0){
		gameEnd = true;
	}
}

//life counter
var lives = 3;

/** @function checkForPlayerHit
  * checks if player has been hit by enemy bullet
  * @param {enemyBullet} bullet - instantiation of enemyBullets
  */
function checkForPlayerHit(bullet){
	if(bullet.x < playerX + 10 + 20 && bullet.x + 5 > playerX + 10 && bullet.y < playerY + 10 + 20 
				&& bullet.y + 5 > playerY + 10){
		enemyBulletsArray.splice(enemyBulletsArray.indexOf(this), 1);
		lives -= 1;
		updateLives();
	}
}

/** @function enemyShooting
  * chooses a random enemy to have shoot
  */
function enemyShooting(){
	var rand = Math.floor(Math.random() * 10);
	if(enemies[rand] !== null){
		var newEnemyBullet = new enemyBullets(enemies[rand].x,enemies[rand].y, 5, 5);
		enemyBulletsArray.push(newEnemyBullet);
	}
	
}

/** @function updateLives
  * updates lives counter and if it reaches 0, signals end of game
  */
function updateLives(){
	if(lives <= 0){
		gameEnd = true;
	}
}

//start game loop
window.requestAnimationFrame(loop);