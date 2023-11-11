class SettingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingScene' });
    }

    preload() {
        // Your preload logic
            // Add any assets required for the game scene here
            this.load.image('bg3', ' assets/bgSettings2.jpg');
    }

    create() {
        // Your create logic
         // Add game logic and objects here
         this.add.image(0,0,'bg3').setOrigin(0).setScale(1);

         //Reaload button
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
 
         const soundTXT = this.add.text(300, 200, 'Sound:', {
             fontSize: '64px Arial',
         });
         soundTXT.setTint(0x809779);
         soundTXT.setShadow(2,2, '#333333', 2, false, true);
 
         // Slider
 
         let bar2 = this.add.rectangle(400, 300, 215, 30, 0xffffff, 0.5);   // Just decoration      
         const slider = this.add.container(400, 300);
         let bar = this.add.rectangle(0, 0, 200, 16,0x000000); 
         const control = this.add.circle(0, 0, 12, 0x809779);  
 
         control.setInteractive({ draggable: true });
         
         control.on('drag', function (pointer, dragX, dragY) {
 
             control.x = Phaser.Math.Clamp(dragX, -100, 100);
             var volume = (control.x + 100) /200;
             bgMusic.setVolume(volume);
             // console.log(dragX);
         });
 
         slider.add([bar, control])
 
         const startBT = this.add.rectangle(400,350, 100, 35,0x809779, 0.50);
         startBT.setInteractive();
         startBT.on('pointerdown', function(){
             this.scene.start('GameScene');
             this.sound.add('click').play();
         },this);  
 
         button =this.add.text(370, 337, 'PLAY',{
             fontSize: '24px Arial',
             fill: '#ffffff'      
         });
         button.setShadow(2,2, '#333333', 2, false, true); //text shadow
    }
}
