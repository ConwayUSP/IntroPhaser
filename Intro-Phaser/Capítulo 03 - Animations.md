
# Animations

As animações é o que da alma para o jogo, ninguém quer jogar um jogo desanimado, mesmo que mínimas até Slay the Spire tem a animação de efeitos de cartas portanto é uma parte fundamental dos jogos. No Phaser é usado a animação por frames e é quase sempre aplicada em uma `sprite`.

Existem várias configurações para uma animação:

```js
// exemplo 
let animationConfig = {
    key: "",

    frames: {
        key: '',
        frame: '', 
        duration: 0
    },

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
    yoyo: false,

    // visibilidade
    showBeforeDelay: false,
    showOnStart: false,
    hideOnComplete: false,
};

this.anims.create(animationConfig);
```






















# Conclusões
