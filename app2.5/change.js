class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.image('bg', 'assets/background.png');
        this.load.spritesheet('gameboy', 'assets/kunaiS.png', { frameWidth: 8, frameHeight: 30 });
        this.load.audio('music', ['assets/backgroundmusic.mp3']);
    }

    create ()
    {
        var music = this.sound.add('music',{
            loop: true
        });
        music.play();

        this.add.image(400, 300, 'bg');

        const gameboy = this.physics.add.image(200, 300, 'gameboy')
            .setVelocity(200, 150)
            .setCollideWorldBounds(true, 1, 1, true);

        gameboy.onWorldBounds = function ()
        {
            this.setFrame((this.frame.name + 1) % 5);
        };


        this.physics.world.on('worldbounds', (body) =>
        {
            body.gameObject.onWorldBounds();
        });

        const slider = this.add.container(400, 300);
        let bar = this.add.rectangle(0, 0, 200, 16,0x000000); 
        const control = this.add.circle(0, 0, 12, 0x809779);  

        control.setInteractive({ draggable: true });
        
        control.on('drag', function (pointer, dragX, dragY) {

            control.x = Phaser.Math.Clamp(dragX, -100, 100);
            var volume = (control.x + 100) /200;
            music.setVolume(volume);
            // console.log(dragX);
        });

        slider.add([bar, control]);

    }



}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 200 }
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);