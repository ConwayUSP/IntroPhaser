import Phaser from "phaser"

export default class Start extends Phaser.Scene {

    preload() {
        this.load.image('background', 'background.png');
    }

    create() {
        this.add.image(950, 450, 'background');
    }

    update() {

    }

}