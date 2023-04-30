var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade', //Glacing arcade physics system
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var player;
var coins;
var balls;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/background.png');
    this.load.image('ground', 'assets/platform2.png');
    this.load.image('block2','assets/block5.png');
    this.load.image('coin', 'assets/smallredcoin.png');
    this.load.image('ball', 'assets/smallblade.png');
    this.load.spritesheet('dude', 'assets/sasuke.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //sky set to size 'setScale(0,0)' move to the origo setOrigin(0,0)
    this.add.image(0, 0, 'sky').setOrigin(0,0).setScale(1);

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
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function collectcoin (player, coin)
{
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
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}