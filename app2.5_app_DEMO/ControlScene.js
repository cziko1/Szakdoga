class ControlScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ControlScene' });
    }

    preload() {
        // Your preload logic
        this.load.image('bg2', ' assets/bgControl.png');
    }

    create() {
        // Your create logic
        // Add game logic and objects here
        this.add.image(0,0,'bg2').setOrigin(0).setScale(.325);

        // Back button
        
        const backBT = this.add.rectangle(55, 45, 100, 40, 0x000000, 0.30);
        backBT.setInteractive();
        backBT.on('pointerdown', function(){
            this.scene.start('MenuScene');
            this.sound.add('click').play();
            bgMusic.stop();
        },this);

        button =this.add.text(400, 300, 'BACK',{
            fontSize: '32px',
            fill: '#ffffff'
        });
        button.setOrigin(5, 9);

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
        const playBT = this.add.rectangle(400,465, 100, 45,0x000000 ,0.30);
        playBT.setInteractive();
        playBT.on('pointerdown', function(){
            this.scene.start('GameScene');
            this.sound.add('click').play();
        },this);

        button = this.add.text(400, 300, 'PLAY',{
            fontSize: '32px',
            fill: '#ffffff'
        });
        button.setOrigin(0.5, -5);

        }
    }

