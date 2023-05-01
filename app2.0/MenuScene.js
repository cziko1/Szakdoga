var config= {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene:{
        preload: preload,
        create: create
    } 
};

var game = new Phaser.Game(config);

var startButton;
var title;

function preload(){
    this.load.image('background', 'assets/uchiha_d.jfif');
}

function create() {
    //background image
    this.add.image(0,0,'background').setOrigin(0.075, 0).setScale(1.55,1.8);

    //Add title
    title = this.add.text(400,150, 'My Game', {
        fontSize: '64px',
        fill: '#9A0000'
    });
    title.setOrigin(0.5);

    //start button
    startButton =this.add.text(400, 300, 'start',{
        fontSize: '32px',
        fill: '#9A0000'
    });
    startButton.setOrigin(0.5);
    startButton.setInteractive();
    startButton.on('pointerdown', function(){
        this.scene.start('GameScene');
    },this);
}

// Define GameScene
var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:


    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene' });
    },

    preload: function ()
    {
        // Add any assets required for the game scene here
        this.load.image('bg', ' assets/background.jpg');
    },

    create: function ()
    {
        // Add game logic and objects here
        this.add.image(0,0,'bg').setOrigin(0,0);
    }
});

// Add the game scene to the game
game.scene.add('GameScene', GameScene);

// Start the main menu
game.scene.start('MainScene');
