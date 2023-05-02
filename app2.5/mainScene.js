var config= {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade', //Glacing arcade physics system
        arcade: {
            gravity: {
                y: 350
             },
            debug: false
        }
    },
    scene:{
        preload: preload,
        create: create,
        update: update
    } 
};

var game = new Phaser.Game(config);

var startButton;
var title;

/*game variables: begin*/

var player_config = {
    player_speed: 500,
    player_jumpspeed: -355,
};

var player;
var coins;
var balls;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

//coin audio
var coinSound;
var errorSound;
var bgMusic;
/*game variables: ends*/


function preload(){
    this.load.image('bgMenu', 'assets/uchiha_d.jfif');
};

function create() {
    //background image
    this.add.image(0,0,'bgMenu').setOrigin(0.075, 0).setScale(1.55,1.8);

    //Add title
    title = this.add.text(400,150, 'My Game', {
        fontSize: '64px',
        fill: '#9A0000'
    });
    title.setOrigin(0.5);

    //start button
    startButton =this.add.text(400, 300, 'PLAY',{
        fontSize: '32px',
        fill: '#9A0000'
    });
    startButton.setOrigin(0.5);
    startButton.setInteractive();
    startButton.on('pointerdown', function(){
        this.scene.start('GameScene');
    },this);

    //Control button
    button =this.add.text(400, 300, 'CONTROL',{
        fontSize: '32px',
        fill: '#9A0000'
    });
    button.setOrigin(0.5, -1.5);
    button.setInteractive();
    button.on('pointerdown', function(){
        this.scene.start('controlScene');
    },this);

     // Settings button
     button =this.add.text(400, 300, 'SETTINGS',{
        fontSize: '32px',
        fill: '#9A0000'
    });
    button.setOrigin(0.5, -3.5);
    button.setInteractive();
    button.on('pointerdown', function(){
        this.scene.start('settingScene');
    },this);   

};
function update(){
    
};
function collectcoin (player, coin)
{
    //coin sound
    this.coinSound.play();
        
    coin.disableBody(true, true);

    // Score updating
    score += 1;
    scoreText.setText('Score: ' + score);

    if (coins.countActive(true) === 0)
    {
        //  A new batch of coins to collect
        coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var ball = balls.create(x, 16, 'ball');
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);
        ball.setVelocity(Phaser.Math.Between(-200, 200), 20);
        ball.allowGravity = false;

    }
}

function hitball (player, ball)
{
    //error sound
    this.errorSound.play();

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
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
        this.load.image('background', 'assets/background.png');
        this.load.image('ground', 'assets/platform2.png');
        this.load.image('block2','assets/block5.png');
        this.load.image('coin', 'assets/smallredcoin.png');
        this.load.image('ball', 'assets/smallblade.png');
        // sprite sheet
        this.load.spritesheet('dude', 'assets/sasuke.png', { frameWidth: 32, frameHeight: 48 });
    
        //Sounds
        // background music
        this.load.audio('bgMusic', ['assets/backgroundmusic.mp3']);
        //coin sound effect
        this.load.audio('coinSound',['assets/coin_short.mp3']);
        //error sound effect
        this.load.audio('errorSound', ['assets/error.mp3']);

    },

    create: function ()
    {
        // Add game logic and objects here
        //background music
        bgMusic = this.sound.add('bgMusic', {
            loop: true  //loop the music
        });
        // play the music,
        bgMusic.play();
        //set the music volume
        bgMusic.setVolume(0.5);
        //coin sound
        this.coinSound = this.sound.add('coinSound');
        //error sound 
        this.errorSound = this.sound.add('errorSound');

        //background set to size 'setScale(0,0)' move to the origo setOrigin(0,0)
        this.add.image(0, 0, 'background').setOrigin(0,0).setScale(1);

        //the ground is static , it cannot move
        platforms = this.physics.add.staticGroup();

        //The platfom and resize
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //block2 in the air
        platforms.create(600, 400, 'block2');
        platforms.create(50, 250, 'block2');
        platforms.create(750, 220, 'block2');

        // The player's settings
        player = this.physics.add.sprite(100, 450, 'dude');

        //  Player physics and bounce
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //Control
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //You can control with the cursors
        cursors = this.input.keyboard.createCursorKeys();

        //the coins spawns
        coins = this.physics.add.group({
            key: 'coin',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        coins.children.iterate(function (child) {

            // different coins have a different bounce 
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        balls = this.physics.add.group();

        //The scoreboard
        scoreText = this.add.text(16, 16, 'score: 0', { 
            fontSize: '16px',
            fill: '#ff0000',
        });


        //Collide the player and the coins
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(coins, platforms);
        this.physics.add.collider(balls, platforms);

        //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoin function
        this.physics.add.overlap(player, coins, collectcoin, null, this);

        this.physics.add.collider(player, balls, hitball, null, this);
    },

    update: function()
    {
    if (gameOver)
        {   
            bgMusic.stop();
            return;
        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-player_config.player_speed);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(player_config.player_speed);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(player_config.player_jumpspeed);
        }
    },

    
});

var controlScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:


    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'controlScene' });
    },

    preload: function ()
    {
        // Add any assets required for the game scene here
        this.load.image('bg2', ' assets/bgControl.png');
    },

    create: function ()
    {
        
        // Add game logic and objects here
        this.add.image(0,0,'bg2').setOrigin(0).setScale(.325);

        // Back button
        button =this.add.text(400, 300, 'Back',{
            fontSize: '32px',
            fill: '#ffffff'
        });
        button.setOrigin(5, 9);
        button.setInteractive();
        button.on('pointerdown', function(){
            window.location.reload();
        },this);

        title = this.add.text(400, 150, 'Control:\n', {
            fontSize: '64px',
            fill: '#ffffff'
        });
        title.setOrigin(0.5)

        // Moving: A W S 
        title = this.add.text(400, 150, 'Moving:\t \n\nLeft: Arrow left\nRight: Arrow Right\nJump: Arrow Up\n',{
            fontSize: '32px',
            fill: '#ffffff'
        });
        title.setOrigin(0.5, -0.5)

        // Play button
        button = this.add.text(400, 300, 'PLAY',{
            fontSize: '32px',
            fill: '#ffffff'
        });
        button.setOrigin(0.5, -5);
        button.setInteractive();
        button.on('pointerdown', function(){
            this.scene.start('GameScene');
        },this);


    }
});

var settingScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:


    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'settingScene' });
    },


    preload: function ()
    {
        // Add any assets required for the game scene here
        this.load.image('bg3', ' assets/bgSettings2.jpg');

    },

    create: function ()
    {
        // Add game logic and objects here
        this.add.image(0,0,'bg3').setOrigin(0).setScale(1);

        //Reaload button
        button =this.add.text(400, 300, 'back',{
            fontSize: '32px',
            fill: '#000000'
        });
        button.setOrigin(5,9);
        button.setInteractive();
        button.on('pointerdown', function(){
            window.location.reload();
        },this);

        //Sound title
        title = this.add.text(400, 150, 'Sound:',{
            fontSize: '64px',
            fill: '#809779'
        });
        title.setOrigin(0.5);

        // Slider
        slider = this.add.container(400, 300);

        bar = this.add.rectangle(0, 0, 200, 16, 0x000000); 
        control = this.add.circle(0, 0, 12, 0x809779);  

        control.setInteractive({ draggable: true });
        
        control.on('drag', function (pointer, dragX, dragY) {

            control.x = Phaser.Math.Clamp(dragX, -100, 100);
            // console.log(dragX);
        });
        
        slider.add([bar, control]);
    
    }
});

// Add the game scene to the game
game.scene.add('GameScene', GameScene);
// Add the control scene to the game
game.scene.add('ControlScene', controlScene);
// Add the settings scene to the game
game.scene.add('SettingScene', settingScene);
// Start the main menu
game.scene.start('MainScene');