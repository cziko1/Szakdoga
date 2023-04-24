let player_config = {
    player_speed: 950,
    player_jumpspeed: -730,
}

let config = {
    type:  Phaser.AUTO,
    scale: {
        //phaser.Scale.FIT,
        width:  1200,
        height:  720,
    },
    backgroundColor: '#7D9AD8',
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{
                y: 1000,
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



    let ground = this.add.tileSprite(0, H - 48, W, 48, 'ground'); //  begining: 0, H-48 ~ heigh, How many pixels visible 
    ground.setOrigin(0,0); //rigidbody 
    this.physics.add.existing(ground, true);           // ground.body.allowGravity = false; // ground.body.immovable = true;


    let eyes = this.add.sprite(755, 330, "eyes").setScale(0.55, 0.55);
    let house = this.add.sprite(350, H - 213, "house").setScale(0.55, 0.55);
    let tree1 = this.add.sprite(710, H - 174, "tree1").setScale(0.75, 1);

    this.player = this.physics.add.sprite(40, 90, 'sasuke', 8)
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

    let fruits = this.physics.add.group({
        key: "credit",
        repeat: 10,
        setScale: { x: 0.05, y: 0.05 },
        setXY: { x: 100, y: 0, stepX: 200 },

    })

    fruits.children.iterate((f) => {
        f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7))
    })


    let blocks = this.physics.add.staticGroup();
    blocks.create(600, 490, "gemBlock").refreshBody();
    blocks.create(850, 490, "block").refreshBody()
    blocks.create(910, 490, "gemBlock").refreshBody();
    blocks.create(967, 490, "block").refreshBody()
    blocks.create(1027, 490, "gemBlock").refreshBody();
    blocks.create(1084, 490, "block").refreshBody()
    blocks.create(967, 350, "gemBlock").refreshBody();


    let platforms = this.physics.add.staticGroup();
    // platforms.create(600, 400, 'ground').setScale(3, 0.75).refreshBody()
    // platforms.create(700, 300, 'ground').setScale(3, 0.75).refreshBody();
    // platforms.create(290, 320, 'ground').setScale(3, 0.75).refreshBody()
    platforms.add(ground);

    //add a collision detection 
    this.physics.add.collider(platforms, this.player)
    this.physics.add.collider(platforms, fruits);
    this.physics.add.collider(blocks, fruits);
    this.physics.add.overlap(this.player, fruits, eatFruit, null, this);
    this.physics.add.collider(this.player, blocks);


    this.cameras.main.setBounds(0, 0, W, H);
    this.physics.world.setBounds(0, 0, W, H);

    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setZoom(1.5);


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