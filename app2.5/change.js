class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.image('bg', 'assets/background.png');
        this.load.spritesheet('gameboy', 'assets/kunaiS.png', { frameWidth: 8, frameHeight: 30 });
    }

    create ()
    {
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