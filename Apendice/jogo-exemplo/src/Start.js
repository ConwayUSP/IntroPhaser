import Phaser from "phaser"

export default class Start extends Phaser.Scene {

    preload() {
        this.load.image('platform', 'platform.png');
        this.load.image('coin', 'coin.png');
        this.load.image('background', 'background.png');
        this.load.spritesheet('player_idle', 'idle.png', { frameWidth: 34, frameHeight: 32 }); // (key, [url], [frameConfig])
        this.load.spritesheet('player_left', 'walking_left.png', { frameWidth: 34, frameHeight: 32 });
        this.load.spritesheet('player_right', 'walking_right.png', { frameWidth: 34, frameHeight: 32 });
    }

    create() {
        this.lights.enable();
        this.lights.setAmbientColor(0x444444); // luz ambiente (senão fica tudo escuro)
        this.add.image(640, 360, 'background').setLighting(true)
        this.add.sprite(100, 600, 'player_idle');
        this.createCoins();
        this.createPlatforms()
        this.createLight();
        console.log(this.lights.lights[0].setVisible(true))
    }

    update() {

    }





    createCoins() {
        let positions = [
            { x: 100, y: 250 },
            { x: 350, y: 500 },
            { x: 640, y: 365 },
            { x: 780, y: 170 },
            { x: 1100, y: 600 },
        ]
        this.coinsGroup = this.add.group()
        positions.forEach(pos => {
            this.coinsGroup.create(pos.x, pos.y, 'coin').setScale(2);
        });
    }

    createPlatforms() {
        this.platformGroup = this.add.group();
        console.log(this.platformGroup.lights);
        this.platformGroup.createMultiple({
            key: 'platform',
            repeat: 5
        }); // cria 6 de uma vez (1 + repeat)
        let platforms = this.platformGroup.getChildren(); // retorna um array contendo cada um
        platforms[0].setPosition(100, 640);
        platforms[1].setPosition(80, 380);
        platforms[2].setPosition(350, 550).setScale(0.5, 1);
        platforms[3].setPosition(640, 485).setScale(1, 1.3);
        platforms[4].setPosition(780, 280);
        platforms[5].setPosition(1200, 670);
    }

    createLight() {
        let positions = [
            {x: 400, y: 290},
            {x: 880, y: 290},
            {x: 500, y: 570},
            {x: 790, y: 570},
            {x: 640, y: 100},
        ]
        positions.forEach(pos => {
            this.lights.addLight(pos.x, pos.y, 100, 0xff0000, 6).setVisible(false)
            
        })
    }
}