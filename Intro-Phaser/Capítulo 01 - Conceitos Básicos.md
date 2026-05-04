# Capítulo 01 - Conceitos Básicos

## [Phaser.Game()](https://docs.phaser.io/phaser/concepts/game)

Essa classe não é muito interativa quanto as outras, normalmente é a única classe que vai estar no seu `main.js` e ela vai ser responsável por chamar todas as outras e configurar sua tela de jogo. Vamos ver um pouco sobre como podemos mudar as configurações.

### Configs

Elas serão o parâmetro quando for chamado essa classe e existem várias configurações que podem ser alteradas, as mais importantes no momento são: 

```js
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
    scene: [], // as cenas que compõe o jogo 
    scale: {
        mode: Phaser.Scale.FIT, // ajusta a tela do jogo automaticamente com o fundo
        autoCenter: Phaser.Scale.CENTER_BOTH // centraliza essa tela
    }
};
```
Assim como nesse exemplo do _physics config_, existem diversas outras bases que podem ser configuradas mais especificamente, como por exemplo o áudio, escala da tela, _inputs_, etc. O Phaser tem algumas classes do tipo **managers** (gerentes) que são sistemas próprios do _game_ para ajudar o desenvolvedor, como por exemplo existe o gerente de cenas, texturas, inputs, animações, eventos, plugins, dados, sons... Vamos ver alguns deles nos próximos capítulos.

Então, após configurarmos nossa config, criamos uma instância do jogo com: 
```js
new Phaser.Game(config);
```
e já está tudo pronto (ou quase, já que não tem cena nenhuma, então...)

## Base de uma cena

Teremos um capítulo só para cenas, mas para falar melhor e conseguir criar nossos objetos precisamos organizá-los dentro de uma cena, para isso criamos um novo arquivo `Start.js` que será a primeira cena a ser chamada pelo Phaser e nela teremos:

```js
import Phaser from "phaser"; // Para poder usar todas as classes do Phaser, coloque isso em todos os arquivos que o usem.

export default class Start extends Phaser.Scene {

    preload() {

    }

    create() {

    }

    update() {

    }

}
```
> Se você não está acostumado com programação orientada à objetos pode parecer um pouco confuso, mas pense que a classe Start usa a classe Phaser.Scene como base e a gente exporta ela para a config, ou seja, no lugar da `scene: []` preenchemos com `scene: [Start]` e importamos com `import Start from "./Start.js"` no topo do arquivo.

Os nomes dos métodos são amigos: 
- `preload()` Onde você carrega previamente ~~não me diga~~ os assets (imagens, animações, audios...)
- `create()` Onde você cria o que foi carregado no `preload()`.
- `update()` É o _game loop_ da cena, rodando normalmente 60 vezes por segundo, ou seja, se quiser ser perfomático pense bem no que vai colocar no update.

Com isso podemos ver de fato alguns _game objects_ que o Phaser tem disponível para nós.

## [Loader](https://docs.phaser.io/phaser/concepts/loader)

Para carregar as nossas sprites, músicas, mapas usamos o sistema embutido de carregamento do Phaser. Cada cena terá seu próprio `preload()` mas você não precisa usar ele em todas, a idéia geral (e recomendada) é ter um cena específica para carregar todos seu _assets_, no nosso exemplo vamos deixar em uma única cena por ser pequeno. Assim fica mais organizado e de fácil manutenção e você só carrega o que for necessário para sua cena específica, se for o caso. Sempre que fomos adicionar algum _game object_ precisamos ter carregado ele antes. E para onde eles vão?


### Cache

Não faria sentido o _loader_ ser colocado em um arquivo separado que carregue tudo sendo que vou usar os _assets_ em outro arquivo, e é por isso que sempre que carregamos algo ele vai para algum `cache` (um armazenamento) que é **global**, ou seja, todas as cenas do Phaser.Game compartilham ele. Existe um cache para cada tipo: JSON, Video, Shaders entre outros, mas existe um importante que é o `textures` que, adivinhe, guarda suas imagens e sprites lindas.

Para o carregamento usamos o `this.load` e em seguida algum _game object_ como imagem, _spritesheet_... Bom então vamos ver o que são esses Jogo Objetos no próximo capítulo.

>Os parâmetros do this.load geralmente são primeiro a string que será a chave para usar em outros lugares e o segundo o PATH de onde está de fato o arquivo (se você deixar no public o Vite já pega direto de lá por padrão)

