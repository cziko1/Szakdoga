var player_config = {
    player_speed: 500,
    player_jumpspeed: -357,
};

var player;
var coins;
var balls;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var gameOverTxt;
var scoreText;

var restButton;
var restTxt;

//coin audio
var coinSound;
var errorSound;

function collectcoin (player, coin)
{
    //coin sound
    this.coinSound.play();
    this.coinSound.setVolume(0.5)
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


class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Your preload logic
         // Add any assets required for the game scene here
         this.load.image('background', 'assets/background.png');
         this.load.image('ground', 'assets/platform2.png');
         this.load.image('block2','assets/block5.png');
         this.load.image('coin', 'assets/smallredcoin.png');
         this.load.image('ball', 'assets/kunai.png');
         // sprite sheet
         this.load.spritesheet('dude', 'assets/sasuke.png', { frameWidth: 32, frameHeight: 48 });
     
         //Sounds
         // background music
         /**this.load.audio('bgMusic', ['assets/backgroundmusic.mp3']);*/
         //coin sound effect
         this.load.audio('coinSound',['assets/coin_short.mp3']);
         //error sound effect
         this.load.audio('errorSound', ['assets/error.mp3']);
    }

    create() {
       // Add game logic and objects here
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
        // The Game Over text 
        gameOverTxt = this.add.text(400, 300, 'Game Over!', {
            fontSize: '64px Arial',
            fill: '#ffffff' 
        });
        gameOverTxt.setOrigin(0.5);
        gameOverTxt.setVisible(false);

        // Scene restast Button aftor Game Over

        restButton = this.add.rectangle(400, 370, 100, 30, 0x000000, 0.5);
        restButton.setInteractive();
        restButton.on('pointerdown',function(){
            window.location.reload();
        },this);
        restButton.setVisible(false);
        restTxt = this.add.text(400, 360, 'restart',{
            fontSize: '20px',
            fill: '#ffffff'
        });
        restTxt.setOrigin(0.5,0);
        restTxt.setVisible(false);
        
        // Pause Button
        const pauseBT = this.add.rectangle(215, 580, 70, 20, 0x000000,0.50);
        button =this.add.text(190, 572, 'Pause',{
            fontSize: '16px',
            fill: '#ffffff'
        });
        button.setInteractive();
        button.on('pointerdown', function(){
            this.scene.pause();
            this.sound.add('click').play();
        },this);

        const resumeBT = this.add.rectangle(300, 580, 80, 20, 0x000000,0.50);
        button =this.add.text(272, 572, 'Resume',{
            fontSize: '16px',
            fill: '#ffffff'
        });
        button.setInteractive();
        button.on('pointerdown', function(){
            this.scene.resume();
            this.sound.add('click').play();
        },this);

        //Back button (reload)
        const backBG = this.add.rectangle(35, 580, 50, 20, 0x000000, 0.50);

        button =this.add.text(16, 572, 'Back',{
            fontSize: '16px',
            fill: '#ffffff'
        });
        button.setInteractive();
        button.on('pointerdown', function(){
            this.scene.start('MenuScene');
            this.sound.add('click').play();
            bgMusic.stop();

        },this);
        
        /** Settings Button */
        const settingBT = this.add.rectangle(120, 580, 100, 20, 0x000000,0.50);
        settingBT.setInteractive();
        settingBT.on('pointerdown', function(){
            this.scene.start('SettingScene');
            this.sound.add('click').play();
        },this);

        button =this.add.text(80, 572, 'Settings',{
            fontSize: '16px',
            fill: '#ffffff'
        });

        /**
         *  The add music Slider
         */        
        const sliderBG = this.add.rectangle(700,580, 100, 20, 0x000000, 0.50);
        const slider = this.add.container(735, 580);
        let bar = this.add.rectangle(0, 0, 20, 10,0x707070); 
        const control = this.add.circle(0, 0, 7, 0xCD1000);  

        control.setInteractive({ draggable: true });
        
        control.on('drag', function (pointer, dragX, dragY) {

            control.x = Phaser.Math.Clamp(dragX, -10, 10);
            var volume = (control.x + 10) /20;
            bgMusic.setVolume(volume);
            // console.log(dragX);
        });
        slider.add([bar, control]);

        button = this.add.text(658,572, 'Sound:',{
            fontSize: '16px',
            fill: '#ffffff'
        });
        /** Music slider end */

           
        //Collide the player and the coins
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(coins, platforms);
        this.physics.add.collider(balls, platforms)

        //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoin function
        this.physics.add.overlap(player, coins, collectcoin, null, this);

        this.physics.add.collider(player, balls, hitball, null, this);


        }
        update (){
            if (gameOver)
            {   
                bgMusic.stop();
                gameOverTxt.visible = true;
                restTxt.visible = true;
                restButton.visible = true;
                
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
        }
    }