import Phaser from "phaser"

export default class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver')
    }
    create() {
        this.add.text(470, 250, 'Game Over', { fontSize: '60px', fill: '#f75002', fontStyle: 'bold' })
        this.add.text(550, 400, `Score: ${this.registry.get('score')}`, { fontSize: '24px', fill: '#f3f702' })
        this.add.text(550, 500, 'R to retry', { fontSize: '24px', fill: '#16f702' })
        this.retryKey = this.input.keyboard.addKey('R');

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.retryKey)) {
            console.log('aaa')
            this.scene.start('Start')
        }
    }

}
