import Phaser from "phaser"
import Start from "./Start.js"


const config = {
    type: Phaser.AUTO, // usa o browser WebGL (ou Canvas) para renderizar na tela 
    width: 1900, // comprimento da tela
    height: 900, // altura da tela
    backgroundColor: '#2d2d2d', // cor de fundo da tela
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 980 },
            debug: true,
        } // qual engine física será usada, nesse caso arcade, e já da para colocar uma gravidade geral e o modo de debug
    },
    scene: Start, // as cenas que compõe o jogo 
    scale: {
        mode: Phaser.Scale.FIT, // ajusta a tela do jogo automaticamente com o fundo
        autoCenter: Phaser.Scale.CENTER_BOTH // centraliza essa tela
    }
};

new Phaser.Game(config)