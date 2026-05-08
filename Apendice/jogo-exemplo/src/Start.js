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
        this.player = this.add.sprite(100, 600, 'player_idle');
        this.createCoins();
        this.createPlatforms()
        this.createLight();

        this.lifes = this.add.text(20, 20, 'Lifes: 3', { fontSize: '20px', fill: '#11a531' });
        this.timer = this.add.text(20, 40, 'Timer: 0', { fontSize: '20px', fill: '#b8190e' });
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers('player_idle', { frames: [0, 1] }),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('walking_left', { frames: [0, 1, 2, 3] }),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers('walking_right', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1,
        });
        this.player.play('idle'); // o .play recebe a key da animação e pode ser chamado direto em uma sprite 
    }

    update(time, delta) {

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
        this.add.tween({
            targets: this.coinsGroup.getChildren(),
            y: '-= 10',
            scaleX: -2,
            ease: 'Sine.easeInOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: true,

        })
    }

    createPlatforms() {
        this.platformGroup = this.add.group();
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
        this.platformGroup.setTint(0xf55666)
    }

    createLight() {
        let positions = [
            { x: 400, y: 290 },
            { x: 880, y: 290 },
            { x: 500, y: 570 },
            { x: 790, y: 570 },
            { x: 640, y: 100 },
        ]
        positions.forEach(pos => {
            this.lights.addLight(pos.x, pos.y, 100, 0xff0000, 6).setVisible(true)

        })
    }
}