class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Your preload logic

        this.load.image('bgMenu', 'assets/uchiha_d.jfif');
        this.load.audio('music', ['assets/backgroundmusic.mp3']);
        this.load.audio('click', ['assets/click.mp3']);
    }

    create() {
        // Your create logic
        bgMusic = this.sound.add('music',{
            loop: true
        });
        bgMusic.play();
        //background image
        this.add.image(0,0,'bgMenu').setOrigin(0.075, 0).setScale(1.55,1.8);
    
        const rectangleBG = this.add.rectangle(400,300, 800,600, 0x00000, 0.20);
        
        //Add title
        title = this.add.text(400,150, 'Uchiha Sasuke: The Game', {
            fontSize: '64px Arial',
        });
        title.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
        title.setOrigin(0.5);
        title.setShadow(2,2, '#333333', 2, false, true);
        
        // Start button
        const startBT = this.add.rectangle(400,300, 200,50,0xff00ff, 0.30);
        startBT.setInteractive();
        startBT.on('pointerdown', function(){
            this.scene.start('GameScene');
            this.sound.add('click').play();
        },this);  
    
        button =this.add.text(400, 300, 'PLAY',{
            fontSize: '32px Arial',
            fill: '#ffffff'      
        });
        button.setShadow(2,2, '#333333', 2, false, true); // Text shadow
        button.setOrigin(0.5);
        button.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)   
    
        //Control button
        const controlBT = this.add.rectangle(400,370, 200,50,0xff00ff, 0.30);
        controlBT.setInteractive();
        controlBT.on('pointerdown', function(){
            this.scene.start('ControlScene');
            this.sound.add('click').play();
        },this);
    
        button =this.add.text(400, 300, 'CONTROL',{
            fontSize: '32px Arial',
            fill: '#ffffff'
        });
        button.setShadow(2,2, '#333333', 2, false, true); // Text shadow
        button.setOrigin(0.5, -1.5);
        button.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)   
    
         // Settings button
        const settingBT = this.add.rectangle(400, 440, 200, 50, 0xff00ff,0.30);
        settingBT.setInteractive();
        settingBT.on('pointerdown', function(){
            this.scene.start('SettingScene');
            this.sound.add('click').play();
    
        },this);
    
         button =this.add.text(400, 300, 'SETTINGS',{
            fontSize: '32px Arial',
            fill: '#ffffff'
        });
        button.setOrigin(0.5, -3.55);
        button.setShadow(2,2, '#333333', 2, false, true);  //Text shadow
        button.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)  
    }

    update() {
        // Your update logic
    }
}
