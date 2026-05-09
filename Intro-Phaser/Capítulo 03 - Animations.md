
# Animations

As animações é o que da alma para o jogo, ninguém quer jogar um jogo desanimado, mesmo que mínimas até Slay the Spire tem a animação de efeitos de cartas portanto é uma parte fundamental dos jogos. No Phaser é usado a animação por frames e é quase sempre aplicada em uma `sprite`.

Existem várias configurações para uma animação, aqui estão algumas:

```js
// exemplo 
let animationConfig = {
    key: "",

    frames: {
        key: '',
        frame: '', 
        duration: 0
    }, // ou usando o generateFrames, que veremos mais abaixo

    frameRate: 1,
    sortFrames: true,
    defaultTextureKey: null,
    skipMissedFrames: true,
    randomFrame: false,

    // duração
    delay: 0,
    duration: null,
    frameRate: null,
    timeScale: 1,

    // repetição
    repeat: 0, // se for -1 fica infinitamente
    repeatDelay: 0,
    yoyo: false, // ela voltaria ao contrário, como um yoyo mesmo

    // visibilidade
    showBeforeDelay: false,
    showOnStart: false,
    hideOnComplete: false,
};

this.anims.create(animationConfig);
```

Para de fato criar os frames da animação nós usamos o `generateFrameNumbers()` que consegue selecionar o frames separando eles pelo tamanho que definimos na _spritesheet_, se voltar na criação dela, verá que colocamos `{ frameWidth: 34, frameHeight: 32 }` no load, isso significa que nossa função vai separar por blocos de 34x32 pixels e criar frames:

```js
// ./src/Start.js
    create() {
        //...
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers('player_idle', {frames: [0, 1]}),
            frameRate: 4,
            repeat: -1,
        });
        this.player.play('idle'); // o .play recebe a key da animação e pode ser chamado direto em uma sprite     
    }
```

Se olhar a tela agora estará vendo o personagem dançando inquietamente, pronto para pegar as moedas. Ele ainda não consegue se mover mas já vamos adionar as outras animações:

```js
// ./src/Start.js
    create() {
        //...
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('walking_left', { frames: [0, 1, 2, 3] }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers('walking_right', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        }); 
    }
```

Pronto, agora ele está devidamente animado e conseguimos ativar essas animações quando fizermos o movimento dele mais para frente.

# Tweens

Talvez você nunca tiesse ouvido falar do termo ~~eu sei que não ouvi~~, vêm do inglês _in-betweening_ que é o ato de colocar algo entre outros, mas podemos dizer que para efeitos párticos é um modo de animação que usa a interpolação, ou seja, você muda os valores de certas variáveis do objeto para dar um efeito fluido de movimento e esse modo também é eficiente. Ele não usa o fato de você precisar desenhar todos os frames e ter uma _frame-based animation_, com o tween você consegue mudar a posição, escala, alpha de um modo orgânico que faz com que pareça animação. Dá pra ligar um tween em outro, repetir, colocar delays, praticamente tudo que uma animação faz sem que seja um outro desenho, ou seja, é uma ferramenta bastante poderosa.

> Assim como as animações, os tweens possuem vários métodos referentes ao efeito animado, como por exemplo .pause(), .resume(), .complete(), .play(), todos eles estão na API do Phaser, tem até como ajustar como o _tweening_ (efeito de transição) se comporta, se é linear, quadrático etc

Um apanhado do que os tweens podem fazer: 

```js

let tween = this.tweens.add({
    targets: gameObject, // da para aplicar em vários objetos ao mesmo tempo
    paused: false, // se você quiser que já comece ou não

    // Colocar funções para rodar no início, se ta ativo, na repetição etc
    onStart: function () {},
    onStartParams: [],

    // delay inicial
    delay: 0, 

    // duração
    duration: 1000,
    ease: 'Linear', // o meio da transição dito anteriormente
    easeParams: null,

    onActive: function () {},
    onUpdate: function (tween, target, key, current, previous, param) {},
    onUpdateParams: [],

    // colocar um delay entre o yoyo (a volta) e o começo do tween
    hold: 0,
    yoyo: false, 
    flipX: false,
    flipY: false,
    onYoyo: function (tween, target, key, current, previous, param) {},
    onYoyoParams: [],

    repeat: 0,
    onRepeat: function (tween, target, key, current, previous, param) {},
    onRepeatParams: [],
    repeatDelay: 0,

    onStop: function () {}, 
    onPause: function () {}, 
    onResume: function () {}, 

    // Como o tween funciona realmente, ou seja, que parâmetros você quer mudar ao longo da duração:
    x: '+=600',        // começa do x inicial
    y: 500,
    rotation: ...,
    angle: ...,
    alpha: ...
    // ...

    // ou
    props: {
        x: { value: '+=600', duration: 3000, ease: 'Power2' },
        y: { value: '500', duration: 1500, ease: 'Bounce.easeOut' }
    },

    // ou
    props: {
        x: {
            duration: 400,
            yoyo: true,
            repeat: 8,
            ease: 'Sine.easeInOut',
            value: {
                getActive: function (target, key, value, targetIndex, totalTargets, tween)
                {
                    return value;
                },
                getStart: function (target, key, value, targetIndex, totalTargets, tween)
                {
                    return value + 30;
                },
                getEnd: function (target, key, value, targetIndex, totalTargets, tween)
                {
                    destX -= 30;
                    return destX;
                }
            }
        },
        ....
    },
});

```

No nosso exemplo vamos dar um pouco de vida para as moedas adicionando um movimento vertical e um giro, facilmente feito com tween:

```js
// ./src/Start.js

    createCoins() {
        //...
        this.add.tween({
            targets: this.coinsGroup.getChildren(), // lembre de acessar as coins em si
            y: '-= 10', // sobe e desce um poquito
            scaleX: -2, // faz com que ela gire
            ease: 'Sine.easeInOut',      
            duration: 600, // sempre em ms
            repeat: -1,
            yoyo: true,
        })
    }

```

Agora sim são moedas dignas de serem coletadas. Existem muito mais coisa que é possível de fazer com tweens então não tenha medo de ir testando os parâmetros e procurar na documentação, se alguma _feature_ você acha que seria útil, provavelmente existe.


# Conclusões

Nesse capítulo vimos como dar um pouco de vida aos componentes do jogo, você sempre pode criar uma animação na raça, usando o update e eventos de input, mas lembre-se que a API é feita justamente para facilitar a nossa vida e por isso tente usar o que ela fornece.