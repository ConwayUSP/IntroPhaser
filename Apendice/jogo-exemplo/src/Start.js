import Phaser from "phaser"

export default class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('platform', 'platform.png');
        this.load.image('coin', 'coin.png');
        this.load.image('background', 'background.png');
        this.load.image('fireball', 'fireball.png');
        this.load.image('lava', 'lava.png');
        this.load.audio('coinAudio','collectCoinAudio.wav');
        this.load.spritesheet('player_idle', 'idle.png', { frameWidth: 34, frameHeight: 32 }); // (key, [url], [frameConfig])
        this.load.spritesheet('player_left', 'walking_left.png', { frameWidth: 34, frameHeight: 32 });
        this.load.spritesheet('player_right', 'walking_right.png', { frameWidth: 34, frameHeight: 32 });

    }

    create() {
        this.cameras.main.fadeIn(800)
        this.lights.enable();
        this.lights.setAmbientColor(0x333333); // luz ambiente (senão fica tudo escuro)
        this.add.image(640, 360, 'background').setLighting(true)
        this.player = this.physics.add.sprite(100, 600, 'player_idle').setCollideWorldBounds(true);
        this.lava = this.physics.add.sprite(640, 710, 'lava').setScale(2, 0.5)
        this.fireballGroup = this.physics.add.group({ allowGravity: false, collideWorldBounds: true })
        this.lava.body.setAllowGravity(false)
        this.createCoins();
        this.createPlatforms();
        this.createLight();
        this.registry.set('lives', 3);
        this.registry.set('score', 0);
        this.lifeTxt = this.add.text(20, 20, 'Lives: 3', { fontSize: '24px', fill: '#b8190e' });
        this.scoreTxt = this.add.text(20, 40, 'Score: 0', { fontSize: '24px', fill: '#14b80e' });


        this.physics.add.collider(this.player, this.platformGroup);
        this.physics.add.collider(this.fireballGroup, this.platformGroup)
        this.physics.add.overlap(this.player, this.coinsGroup, (player, coin) => { this.collectCoin(player, coin) });
        this.touchDanger = this.physics.add.overlap(this.player, [this.lava, this.fireballGroup], (player, obj) => { this.takeDmg(player, obj) });


        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers('player_idle', { frames: [0, 1] }),
            frameRate: 5,
            repeat: -1,
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('player_left', { frames: [0, 1, 2, 3] }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers('player_right', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });
        this.player.play('idle'); // o .play recebe a key da animação e pode ser chamado direto em uma sprite 



        // this.time.delayedCall(250, () => {
        //     let toggle = true; // Variável para controlar o estado

        //     this.time.addEvent({
        //         delay: 500, // Metade do intervalo original, já que ele alterna
        //         callback: () => {
        //             const offsetX = toggle ? 0 : this.coinsGroup.getChildren()[0].width; // Pega o width da coin ou 0 para ajustar o Offset

        //             this.coinsGroup.getChildren().forEach(coin => {
        //                 coin.body.setOffset(offsetX, 0);
        //             }); 

        //             toggle = !toggle; // Inverte para a próxima execução
        //         },
        //         loop: true
        //     });
        // });

    }

    update(time, delta) {
        this.playerMovement()
        if (this.registry.get('lives') == 0) {
            this.cameras.main.setAlpha(0.3)
            this.scene.pause()
            this.scene.launch('GameOver')
        }
    }

    createCoins() {
        let positions = [
            { x: 100, y: 250 },
            { x: 350, y: 500 },
            { x: 640, y: 365 },
            { x: 780, y: 170 },
            { x: 1100, y: 600 },
        ]
        this.coinsGroup = this.physics.add.group()
        let i = 0;
        positions.forEach(pos => {
            let coin = this.coinsGroup.create(pos.x, pos.y, 'coin');
            coin.setScale(2);
            coin.setData("ID", i);
            i++;
        });
        this.coinsGroup.getChildren().forEach(coin => {
            coin.body.setAllowGravity(false);
        })
        this.add.tween({
            targets: this.coinsGroup.getChildren(),
            y: '-= 10',
            scaleX: -2,
            ease: 'Sine.easeInOut',
            duration: 500,
            repeat: -1,
            yoyo: true,
            onRepeat: () => {
                this.time.delayedCall(250, () => {
                    this.coinsGroup.getChildren().forEach(coin => {
                        coin.body.setOffset(coin.width, 0);
                    });
                })
                this.time.delayedCall(750, () => {
                    this.coinsGroup.getChildren().forEach(coin => {
                        coin.body.setOffset(0, 0);
                    });
                })
            },


        })
    }

    createPlatforms() {
        this.platformGroup = this.physics.add.group({ allowGravity: false, immovable: true });
        this.platformGroup.createMultiple({
            key: 'platform',
            repeat: 6
        }); // cria 6 de uma vez (1 + repeat)
        let platforms = this.platformGroup.getChildren(); // retorna um array contendo cada um
        platforms[0].setPosition(100, 640);
        platforms[1].setPosition(80, 380);
        platforms[2].setPosition(350, 550).setScale(0.5, 1);
        platforms[3].setPosition(640, 485).setScale(1, 1.3);
        platforms[4].setPosition(980, 300);
        platforms[5].setPosition(880, 580);
        platforms[6].setPosition(1200, 670);
        this.platformGroup.setTint(0xf55666)
    }

    createLight() {
        this.pentagramLights = [];
        let positions = [
            { x: 400, y: 290 },
            { x: 880, y: 290 },
            { x: 500, y: 570 },
            { x: 790, y: 570 },
            { x: 640, y: 100 },
        ]
        positions.forEach(pos => {
            let newLight = this.lights.addLight(pos.x, pos.y, 100, 0xff0000, 0).setVisible(true)
            this.pentagramLights.push(newLight)
        })
    }

    playerMovement() {
        let movKeys = this.input.keyboard.addKeys("W,S,A,D");
        if (Phaser.Input.Keyboard.JustDown(movKeys.W) && this.player.body.onFloor()) {
            this.player.setVelocityY(-650);
        }
        if (movKeys.A.isDown) {
            this.player.setVelocityX(-350);
            this.player.play("left", true);
        }
        else if (movKeys.D.isDown) {
            this.player.setVelocityX(350);
            this.player.play("right", true);

        }
        else {
            this.player.setVelocityX(0);
            this.player.play("idle", true);
        }
    }

    collectCoin(player, coin) {

        this.sound.play('coinAudio');
        coin.disableBody(true, true);
        let LightId = this.pentagramLights[coin.getData('ID')];
        LightId.setIntensity(LightId.intensity + 2);
        if (this.coinsGroup.countActive(true) === 0) {
            this.coinsGroup.getChildren().forEach(coin => {
                coin.enableBody(true, coin.x, coin.y, true, true)
            })
        }

        const bounds = this.physics.world.bounds;

        const rect = new Phaser.Geom.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);

        const point = Phaser.Geom.Rectangle.GetPoint(rect, Math.random());

        let fireball = this.fireballGroup.create(point.x, point.y, 'fireball')
        fireball.setVelocityX(Phaser.Math.Between(-100, 100) * 5)
        fireball.setVelocityY(Phaser.Math.Between(-100, 100) * 5)
        fireball.setBounce(1, 1);
        this.registry.inc('score', 1)
        this.scoreTxt.setText(`Score: ${this.registry.get('score')}`);
    }
    takeDmg() {
        this.touchDanger.active = false;
        this.player.setTint(0x00ff00)
        this.time.delayedCall(2000, () => {
            this.touchDanger.active = true;
            this.player.setTint(0xffffff)

        })
        this.cameras.main.shake(200, 0.005)
        this.registry.inc('lives', -1);
        this.lifeTxt.setText(`Lives: ${this.registry.get('lives')}`)
        this.player.setPosition(100, 600);
    }
}