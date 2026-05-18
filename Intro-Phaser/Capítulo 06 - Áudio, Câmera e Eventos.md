# Câmera

É por ela que vemos o mundo, sempre que criamos uma cena o Phaser cria uma câmera associada a ela mas podemos criar outras câmeras também se necessário (com o cameras.add()). Com elas é possível fazer várias mecânicas como dar _scroll_ na tela, tremer a tela, zooms, _fog of war_ entre outras, talvez a mais útil para um jogo de plataforma é a de seguir o jogador, pois ai você nunca vai perder ele da tela e podemos criar cenários muito maiores do que o tamanho da tela. No nosso exemplo infelizmente não vamos mexer muito com câmeras, mas para ter uma pequena experiência podemos adicionar alguns efeitos e aproveitar para criar a função de dano:

```js
// ./Start.js
    create() {
        this.cameras.main.fadeIn(800) // efeito de fadein de 0.8s no começo do jogo
    }

    update() {
        if (this.registry.get('lives') == 0) {
            this.cameras.main.setAlpha(0.3) // efeito de pause
            this.scene.pause()
            this.scene.launch('GameOver')
        }
    }
    //...
    // lembre de adicionar no overlap no create
    takeDmg() {
        this.cameras.main.shake(200, 0.005)
        this.registry.inc('lives', -1);
        this.lifeTxt.setText(`Lives: ${this.registry.get('lives')}`)
        this.player.setPosition(100, 600); // retorna para a posição inicial
    }
```

> Existem muitas outras coisas que podem ser feito com câmeras, tente brincar com a ferramenta na medida do possível do jogo-exemplo

Se deixarmos assim você, como um exímio desenvolvedor de jogos, já percebeu um problema: "E se já tiver uma bola de fogo no exato lugar que o player _spawna_? Morte instântanea" e por mais que poderíamos deixar esse bug e chamar de mecânica, é meio frustante. Por isso vamos criar um tempo de invencibilidade para nosso Mush e para isso vamos usar os eventos de Timers:

# Eventos e Timer

Eventos ou sinais são essenciais para a comunicação dos objetos dos jogos, você pode abusar ~~ou não~~ deles, como o Phaser já nos dá algumas escolhas de como fazer essa comunicação nativamente (usando o próprio sistema de eventos) não precisamos tanto de um evento customizado, mas é possível criar facilmente com `.addEvent` que pode ser chamado em um game object, por exemplo.
No exemplo de um tempo de invencibilidade poder criar uma `delayedCall` que consegue chamar uma função após algum tempo específico:

```js
// ./Start.js
    takeDmg() {
        //...
        this.touchDanger.active = false; // desativa o contato
        this.player.setTint(0x00ff00) // deixa o jogador verde porque verde = imune a fogo
        this.time.delayedCall(2000, () => { // duração sempre em ms
            this.touchDanger.active = true; // ativa o contato
            this.player.setTint(0xffffff) // volta a cor original
        })
    }
```

E com isso resolvemos o problema antes dele acontecer, mas outro problema que, se você está acompanhando com o modo debug ativo, deveria estar te deixando furioso é o fato da hitbox das moedas estarem erradas, por conta do que discutimos na criação do _tween_. Agora que temos essa ferramenta de controlar o tempo (uou) vamos corrigir isso:

```js
// ./Start.js
    create() {
        //...
        this.time.delayedCall(250, () => {
            let toggle = true; // Variável para controlar o estado
            this.time.addEvent({
                delay: 500, // chama o evento a cada 500 ms
                callback: () => {
                    const offsetX = toggle ? 0 : this.coinsGroup.getChildren()[0].width; // Pega o width da coin ou 0 para ajustar o Offset
                    this.coinsGroup.getChildren().forEach(coin => {
                        coin.body.setOffset(offsetX, 0);
                    }); 
                    toggle = !toggle; // Inverte para a próxima execução
                },
                loop: true
            });
        });
    }
```

Vamos com calma nesse código que ele pode assustar. De acordo com nosso problema, a hitbox é sempre fixa no canto superior esquerdo da nossa sprite, então quando giramos ela com o tween ela também fica invertida, saindo da nossa sprite pro lado direito. Para resolver criamos uma `delayedCall` com metade da duração do giro, assim esse código começa a rodar quando a moeda