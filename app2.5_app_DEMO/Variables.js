// Buttons
let button;
let title;
let bgMusic;
let settingBT;
let controlBT;
var restButton;
var restTxt;

// Game Variables
var player;
var coins;
var balls;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var gameOverTxt;
var scoreText;

// Coin audio
var coinSound;
var errorSound;

class Variables extends Phaser.Scene{
    constructor(){
        super({key: 'Variables'})
    }
}