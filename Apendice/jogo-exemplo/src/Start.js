import Phaser from "phaser"

export default class Start extends Phaser.Scene {

    preload() {
        this.load.image('background', 'background.png');
        this.load.spritesheet('player_idle', 'idle.png', { frameWidth: 34, frameHeight: 32 }); // (key, [url], [frameConfig])
        this.load.spritesheet('player_left', 'walking_left.png', { frameWidth: 34, frameHeight: 32 });
        this.load.spritesheet('player_right', 'walking_right.png', { frameWidth: 34, frameHeight: 32 });
    }

    create() {
        this.add.image(950, 450, 'background');
        this.add.sprite(100, 800, 'player_idle')
    }

}