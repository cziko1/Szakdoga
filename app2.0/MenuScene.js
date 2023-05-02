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

var button;
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
    button =this.add.text(400, 300, 'start',{
        fontSize: '32px',
        fill: '#9A0000'
    });
    button.setOrigin(0.5);
    button.setInteractive();
    button.on('pointerdown', function(){
        this.scene.start('GameScene');
    },this);

    //Other button
    button =this.add.text(400, 300, 'Control',{
        fontSize: '32px',
        fill: '#9A0000'
    });
    button.setOrigin(0.5, -1.5);
    button.setInteractive();
    button.on('pointerdown', function(){
        this.scene.start('controlScene');
    },this);

    //Another buttona
    button =this.add.text(400, 300, 'Settings',{
        fontSize: '32px',
        fill: '#9A0000'
    });
    button.setOrigin(0.5, -3.5);
    button.setInteractive();
    button.on('pointerdown', function(){
        this.scene.start('settingScene');
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

        //Reaload button
        button =this.add.text(400, 300, 'back',{
            fontSize: '32px',
            fill: '#ffffff'
        });
        button.setOrigin(0.5);
        button.setInteractive();
        button.on('pointerdown', function(){
            window.location.reload();
        },this);
    }
});
// Define controlScene
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
        this.load.image('bg2', ' assets/background2.jpg');
    },

    create: function ()
    {
        
        // Add game logic and objects here
        this.add.image(0,0,'bg2').setOrigin(0,-0.1).setScale(0.2);

                //start button
                button =this.add.text(400, 300, 'game',{
                    fontSize: '32px',
                    fill: '#ffffff'
                });
                button.setOrigin(0.5);
                button.setInteractive();
                button.on('pointerdown', function(){
                    this.scene.start('GameScene')
                },this);

    }
});
// Define Another 
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
        this.load.image('bg3', ' assets/background3.jpg');

    },

    create: function ()
    {
        // Add game logic and objects here
        this.add.image(0,0,'bg3').setOrigin(0.25,0).setScale(1.1);
    }
});
// Add the game scene to the game, the Other and Another
game.scene.add('GameScene', GameScene);
game.scene.add('controlScene', controlScene);
game.scene.add('controlScene', settingScene);

// Start the main menu
game.scene.start('MainScene');
