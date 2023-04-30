
const myCustomCanvas = document.createElement('canvas');

myCustomCanvas.id = 'myCustomCanvas';
myCustomCanvas.style = 'border: 2px solid cyan';

document.body.appendChild(myCustomCanvas);


const config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 720,
    canvas: document.getElementById('myCustomCanvas'),
    scene: {
        preload: preload,
        create: create
    },
    title: 'On the Uchiha Sasuke\'s ways '
};

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('pic', 'assets/uchiha_district.jpg');
}

function create ()
{
    this.add.image(600, 360, 'pic');

    this.add.text(250, 100, ' '+game.config.gameTitle, {font: '50px Arial', fill: '#FF0000'});
}