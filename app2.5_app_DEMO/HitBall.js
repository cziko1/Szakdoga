function hitball (player, ball)
{
    //error sound
    this.errorSound.play();

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;

}

class HitBall extends Phaser.Scene{
    constructor(){
        super({key: 'HitBall'})
    }
}