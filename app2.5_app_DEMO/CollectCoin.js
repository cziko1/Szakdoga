function collectcoin (player, coin)
{
    //coin sound
    this.coinSound.play();
    this.coinSound.setVolume(0.5)
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

class CollectCoin extends Phaser.Scene{
    constructor(){
        super({key: 'CollectCoin'})
    }
}