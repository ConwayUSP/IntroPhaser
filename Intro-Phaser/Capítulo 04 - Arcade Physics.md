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
        // iteramos agora por cada moeda e desativamos a gravidade
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
    this.player = this.physics.add.sprite(100, 600, 'player_idle'); // só colocar ele na física, queremos gravidade pra ele
        //...
    createPlatforms() {
        this.platformGroup = this.physics.add.group({allowGravity: false, immovable: true}); // conseguimos colocar as configs direto na criação também
        //...
    }
```

Já está um pouco melhor e com o debug ativo conseguimos ver a hitbox como um retângulo rosa de cada objeto e aparentemente as das moedas estão erradas quando elas giram, justamente por conta da origem... Vamos resolver isso mais para frente. Mas também o nosso Mush está sendo caindo nas profundezas, atravessando a plataforma, precisamos de colisões.

# Collision e Overlap
