# Arcade Physics

Chegamos no motor, na essência, na fundação dos jogos ~~que usam física~~. O sistema físico usado no `arcade` é voltado para esse nome mesmo, jogos do tipo arcade ou 'retrô', e só consegue manipular dois formatos: círculos e retângulos. Por conta disso não é aconselhável usà-lo se a aplicação exige uma física um pouco mais complexa, como no nosso jogo-exemplo estamos fazendo um simples _plataformer_ ela é muito útil por ser mais simples e rápida em comparação com o outro sistema `matter`, mas não se engane em pensar que o arcade é totalmente limitado, ainda dá para fazer mágica com ele.

## Arcade World

Se você voltar no capítulo 1, a configuração do `Phaser.Game` a gente já tinha colocado qual sistema físico será usado e algumas propriedades dele, mas existem muitas outras como:

```js
physics: {
    default: "arcade",
    arcade: {
      gravity: {
          x: 0,
          y: 0
      },
      checkCollision: {
          up: true,
          down: true,
          left: true,
          right: true
      },
      fixedStep: true, // fixa a taxa para rodar certo em monitores com frequência muito alta
      fps: 60,
      timeScale: 1,     // 2.0 = half speed, 0.5 = double speed
      overlapBias: 4, // ajusta o overlap dos corpos, quanto maior menos overlap
      forceX: false, // separa os corpos verticalmente primeiro
      isPaused: false,
      // configurações de debug
      debug: false,
      debugShowBody: true,
      debugShowStaticBody: true,
      debugShowVelocity: true,
      debugBodyColor: 0xff00ff,
      debugStaticBodyColor: 0x0000ff,
      debugVelocityColor: 0x00ff00,
    },
  }
```
E também alguns métodos úteis: 

```js
    // em uma Phaser.Scene
    this.physics.pause(); // e resume
    this.physics.world.setBounds(x, y, width, height); // mudar as limitações
    this.physics.world.setBoundsCollision(); 
    this.physics.add.existing(gameObject, bodyType) // adiciona ele na física, Type 0 = dynamic e 1 = static, lembre que o .add vem das Factories que ajudam a gente
    this.physics.add.collider(objectsA, objectsB, collideCallback); // colisão entre objetos ou groups e o collideCallback é uma função que é chamada na colisão
    this.physics.add.overlap(objectsA, objectsB, overlapCallback); // o overlap se diferencia da colisão no sentido do movimento do corpo continuar

```

# Body

Os corpos são os integrantes do sistema físico, eles que interagem entre si e são associados a algum game object, como sprite, imagens, grupos. Do mesmo jeito que podemos adicionar as sprites na cena fora da física, a gente pode colocar elas direto com `this.player = this.physics.add.sprite(x, y, key);` (ou .staticSprite). Para adicionar _groups_ podemos fazer também na criação (IE: `this.coinsGroup = this.physics.add.group()`) ou podemos usar o `this.physics.world.enable(this.coinsGroup)`
Um arcade body tem diversos métodos físicos, como por exemplo `body.setVelocity(x, y)` (e aceleração), `body.setDrag()`, `body.setFriction()` e como nós falamos dos formatos, a _hitbox_ que é o que estamos formando com esses body's só podem ser retângulos ou círculos: `body.setCircle(rad, OffsetX, OffsetY)` para circles e  `body.setSize(width, height, center)` para retângulos.

> O 'center' por padrão é false e isso significa que o Offset é a coordenada (0,0), ou seja, é como se a hitbox 'crescesse' a partir dessa origem e isso tem implicações aterrorizantes como veremos as seguir. Mas não se preocupe ~~agora~~ já que podemos alterar o Offset com `body.setOffset(x, y)`.

Então vamos adicionar nossos game objects na física e aqui você terá uma escolha, se você está acompanhando o jogo-exemplo como um bom garoto, criando ele junto com a trilha, você pode escolher como melhor adicionar as nossas sprites na física, seja mudando na criação ou adicionando eles na física após. Qualquer problema dê uma espiada no ./Apendice/jogo-exemplo/src que lá estará o jogo pronto.

Depois de adicionar: `this.coinsGroup()`, `this.platformGroup()` e o `this.player` deve estar tudo perfeito certo??? ~~NÃO TA TUDO QUEBRADO SOCORRO~~
Sim provavelmente você terá na tela só as moedas piscando loucamente e caindo, e se tiver com o debug do main.js ativo alguns quadrados girando mas sem pânico, vamos resolver.

Primeiro as moedas:

```js
//      ./Start.js
    createCoins() {
        let positions = [
            { x: 100, y: 250 },
            { x: 350, y: 500 },
            { x: 640, y: 365 },
            { x: 780, y: 170 },
            { x: 1100, y: 600 },
        ]
        this.coinsGroup = this.physics.add.group() // adicionamos na física
        positions.forEach(pos => {
            this.coinsGroup.create(pos.x, pos.y, 'coin').setScale(2);
        });
        // iteramos agora por cada moeda e desativamos a gravidade (ou fazemos como as plataformas, como veremos mais abaixo)
        this.coinsGroup.getChildren().forEach(coin => {
            coin.body.setAllowGravity(false);
        })
        this.add.tween({
            //...
    })
    }
```
Vamos usar a mesma ideia pro player e para as plataformas:

```js
//      ./Start.js
    this.player = this.physics.add.sprite(100, 600, 'player_idle').setCollideWorldBounds(true);; // só colocar ele na física, queremos gravidade pra ele e que colida com o limite do mapa (veremos colisões depois)
        //...
    createPlatforms() {
        this.platformGroup = this.physics.add.group({allowGravity: false, immovable: true}); // conseguimos colocar as configs direto na criação também
        //...
    }
```

Já está um pouco melhor e com o debug ativo conseguimos ver a hitbox como um retângulo rosa de cada objeto e aparentemente as das moedas estão erradas quando elas giram, justamente por conta da origem... Vamos resolver isso mais para frente. Mas também o nosso Mush está sendo caindo nas profundezas, atravessando a plataforma, precisamos de colisões.

# Collision e Overlap

As colisões levam em consideração o _boundary_ do nosso corpo, o que comumente chamamos de hitbox. No arcade existem algumas ~~várias~~ limitações quanto ao formato e cálculo das colisões e é essa parte que mais se diferencia do Matter, por exemplo, se um corpo passar com uma velocidade relativamente alta, vai ter o _phasing_. Ao adicionar os corpos no sistema físico eles não 'sabem' que outros corpos existem, por isso não há as colisões. Para isso adicionamos um _collider_ com os parâmetros sendo os corpos: 
```js
let collider = scene.physics.add.collider(
  objectsA,
  objectsB,
  collideCallback // função que é chamada ao colidir
);
// this.physics.add.collider(objectsA, objectsB, collideCallback, processCallback, callbackContext);
```
A mesma assinatura é da `add.overlap()` como vimos acima. No nosso exemplo então podemos escrever:

```js
    // ./Start.js

    create() {
        //...
        this.physics.add.collider(this.player, this.platformGroup);
        this.physics.add.overlap(this.player, this.coinsGroup);
    }
```
E agora o Mush não cai nas profundezas, mas ainda está parado... 


# Inputs

>Inputs é um sistema a parte da física, mas como não vamos nos aprofundar muito nele (apesar de ter muitas aplicações) por conta da natureza do nosso jogo-exemplo, decidimos colocar aqui para seguir a linha da criação.

Vamos fazer ele se mover com nossos _inputs_ então e para isso o Phaser nos ajuda, como sempre.
Com relação ao teclado, que é o que usaremos para fazer os movimentos, nós podemos adicionar teclas separadas e 'ouvir' através do sistema de eventos ou usar as próprias _keys objects_ que adiciona diretamente. O Phaser também tem o método de criar 5 teclas de uma vez (setinhas + espaço + shift), já que é muito usado em jogos:

```js
    let cursorKeys = scene.input.keyboard.createCursorKeys(); // cria as 5 teclas de uma vez
    let movKeys = scene.input.keyboard.addKeys("W,S,A,D"); // cria as clássicas

    // alguns membros e métodos
    movKeys.W.isUp // e isDown, bool que diz se a W está UP (não pressionada) ou Down
    movKeys.W.altKey // e ctrl/shiftKey, bool que diz se o W está pressionado junto com alt/ctrl/shift
    movKeys.W.getDuration() // retorna o tempo em ms da duração do pressionamento
    // Quando fazemos addKeys apenas adicionamos elas no Phaser, ou seja, precisamos usar o namespace Phaser.Input.Keyboard que possuí funções auxiliares como
    Phaser.Input.Keyboard.JustDown(movKeys.W) // e JustUp, retorna um booleano uma única vez quando a tecla adicionada é pressionada/solta
```
Agora você pode escolher qual configuração usar, como somos gamers raízes vamos usar o WASD clássico no nosso exemplo, para separar melhor podemos criar uma função básica que controla o movimento:

```js
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
```

Quando chamamos, finalmente, essa função dentro do `update()`, teremos nosso movimento e quando você testar verá que não consegue coletar de fato as moedas, mas isso é porque colocamos a colisão como overlap e não chamamos nenhum _callback_, significa que o Mush passa por elas como se não existissem. Portanto vamos criar essa função de coleta, mas o que ela vai fazer?


# Conclusão

Esse capítulo poderia ser muito maior do que é, porém cada jogo têm suas peculiaridades, no nosso exemplo não há muitas colisões e/ou corpos físicos e o movimento do Mush é bem simples, mas a física é o que dita como as coisas se movem e interagem, então sempre iremos usar ela.
