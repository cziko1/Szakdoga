let player_config = {
    player_speed: 550,
    player_jumpspeed: -530,
}

let config = {
    type:  Phaser.AUTO,
    scale: {
        
        width:  700,
        height:  412,
    },
    backgroundColor: '#7D9AD8',
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{
                y: 800,
            },
            //should be true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    this.load.image("ground", "assets/ground1.png");
    
    this.load.image("credit", "assets/uchiha.png");
    this.load.image("eyes", "assets/eyes.png");
    this.load.image("house", "assets/house.png");
    this.load.image("tree1", "assets/tree1.png");
    this.load.image("gemBlock", "assets/akaBlock.png");
    this.load.image("block", "assets/block1.png");

    this.load.spritesheet("sasuke", "assets/sasuke.png",{
        frameWidth: 57,
        frameHight: 90
    });


}
function create() {
    W = game.config.width;
    H = game.config.height;



    let ground = this.add.tileSprite(0, H-48, W+700, 48, 'ground'); //  begining: 0, H-48 ~ heigh, How many pixels visible 
    ground.setOrigin(0,0); //rigidbody 
    this.physics.add.existing(ground, true);           // ground.body.allowGravity = false; // ground.body.immovable = true;


    let eyes = this.add.sprite(550, 330, "eyes").setScale(0.55, 0.55);
    let house = this.add.sprite(350, H - 213, "house").setScale(0.55, 0.55);
    let tree1 = this.add.sprite(110, H - 174, "tree1").setScale(0.75, 1);

    this.player = this.physics.add.sprite(4, 9, 'sasuke', 8)
    this.player.setBounce(0.3)
    this.player.setCollideWorldBounds(true);

    //Player animation and Player movement
    //animation
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('sasuke', {
            start: 0, end: 7
        }),
        frameRate: 10,
        repate: -1
    })

    this.anims.create({
        key: 'center',
        frames: this.anims.generateFrameNumbers('sasuke', {
            start: 8, end: 8
        }),
        frameRate: 10
    })

    this.anims.create({
        key: 'rigth',
        frames: this.anims.generateFrameNumbers('sasuke', {
            start: 8, end: 11
        }),
        frameRate: 10,
        repate: -1
    })
    //Keyboard
    this.cursors = this.input.keyboard.createCursorKeys();

    let credits = this.physics.add.group({
        key: "credit",
        repeat: 10,
        setScale: { x: 0.05, y: 0.05 },
        setXY: { x: 100, y: 0, stepX: 100 },

    })

    credits.children.iterate((f) => {
        f.setBounce(Phaser.Math.FloatBetween(0.2, 0.3)) //pattogas
    })


    let blocks = this.physics.add.staticGroup();
    blocks.create(100, 270, "gemBlock").refreshBody();
    blocks.create(155, 270, "gemBlock").refreshBody();

    blocks.create(550, 230, "block").refreshBody()
    blocks.create(610, 230, "gemBlock").refreshBody()
    blocks.create(667, 230, "block").refreshBody()
    blocks.create(727, 230, "gemBlock").refreshBody();
    blocks.create(784, 230, "block").refreshBody()
    


    let platforms = this.physics.add.staticGroup();
    platforms.create(355, 360, 'block').refreshBody()
    platforms.create(415, 310, 'block').refreshBody();
    platforms.create(475, 270, 'block').refreshBody()
    platforms.add(ground);

    //add a collision detection 
    this.physics.add.collider(platforms, this.player)
    this.physics.add.collider(platforms, credits);
    this.physics.add.collider(blocks, credits);
    this.physics.add.overlap(this.player, credits, eatFruit, null, this);
    this.physics.add.collider(this.player, blocks);


    this.cameras.main.setBounds(0, 0, W, H);
    this.physics.world.setBounds(0, 0, W, H);

    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setZoom(1);


}
function update() {

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play('left', true)
    }
    else if (this.cursors.right.isDown) {
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play('rigth', true)
    }
    else {
        this.player.setVelocityX(0);
        this.player.anims.play('center', 'true')
    }

    //add jumping ablility
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(player_config.player_jumpspeed)
    }
}

function eatFruit(player, fruit) {
    fruit.disableBody(true, true)
}