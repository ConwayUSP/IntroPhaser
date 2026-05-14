# Data e Scene Managers

Todo jogo precisa de algum tipo de manipulação de dados, seja para um salvar um inventário, dados relevantes para o jogador como vidas, munição ou também dados próprios de objetos que a gente queira manipular. O Phaser tem um sistema muito bom de registros chamado de `registry` que consegue acessar dados do jogo como um todo, ou seja, compartilhado pelas cenas. Todos os game objects, incluindo cenas, tem a propriedade `data` que invoca o data manager para armazenar e devolver dados

Alguns métodos importantes que o Data Manager oferece:

```js
//  No registro
this.registry.set('player', 'Mush'); 

//  Salvar na própria cena
this.data.set('player', 'Mush');

//  Salvar no game object
this.player.setData('player', 'Mush');

this.player.getData('player'); // retorna "Mush"
this.data.inc('score', 10); // incrementa em 10 o value da key 'store' 
this.registry.reset() // limpa o registry
```

O fato de termos dados intrínsecos e controláveis aos game objects abrem muitas portas, conseguimos atribuir um ID para cada um, se necessário, conseguimos relacionar um ou outro através desses dados, retornando com `getData()`. O registro também é muito quando trabalhando com várias cenas, no nosso exemplo vamos usar só duas cenas para demonstrar como o registry funciona, a `Start.js` e `GameOver.js`, como essa última vai ser bem simples vamos fazer nesse capítulo. 
No capítulo 2 criamos os textos de vidas e um score, e também adicionamos a imagem da lava e fireball, mas não sei se você percebeu, não tem como perder esse jogo ainda porque não colocamos esses assets e um jogo que é impossível perder ainda é um jogo? fica a pergunta.

Agora que já sabemos como adicionar objetos na física, fica fácil colocar eles no jogo:

> Existem diversas práticas em como separar/organizar seus game objects mas no fundo vai sempre depender de como o jogo em si é organizado, nesse exemplo vamos vamos criar separadamente a lava e as fireballs, a ideia é criar uma fireball no momento que coleta a moeda e a lava ficar sempre lá.

```js
// ./Start.js
create() {
    //...
    this.player = //...
    this.lava = this.physics.add.sprite(640, 710, 'lava').setScale(2,0.5);
    this.fireballGroup = this.physics.add.group({ allowGravity: false, collideWorldBounds: true})
    this.lava.body.setAllowGravity(false)
}
```

Pronto, já temos a lava, agora as fireballs vamos criar dentro de uma função que será a `collectCoin` e ela fará várias coisas: Vai desativar a moeda, aumentar nosso score, criar uma fireball, acender o pentagrama e reativar as moedas quando forem todas coletadas. Mas antes disso, vamos usar finalmente o _Data Manager_ colocando um `ID` em cada moeda criada. Para isso basta modificar um pouco nossa função:

```js
// ./Start.js
    createCoin() {
        //...
        let i = 0;
        positions.forEach(pos => {
            let coin = this.coinsGroup.create(pos.x, pos.y, 'coin');
            coin.setScale(2);
            coin.setData("ID", i); // desse modo, cada moeda vai ter um ID unico começando do 0
            i++;
        });
        //...
    }
```
Com isso cada moeda vai ter um dado chamado "ID" e podemos pegar esse dado em qualquer parte da cena. Vamos então ver como vai ficar a função de coletar as moedas.

```js
// ./Start.js
    collectCoin(player, coin) {

        coin.disableBody(true, true); // desativa o body o.o
        let LightId = this.pentagramLights[coin.getData('ID')]; // lembre que this.pentagramLights é só um array com os Lights objects, como tem a mesma qtd de moedas que luzes, podemos acessar com o ID das moedas
        LightId.setIntensity(LightId.intensity + 2); // Cada vez que pega moeda deixa a luz mais intensa
        if (this.coinsGroup.countActive(true) === 0) { // quanto não tem mais moedas, spawna mais
            this.coinsGroup.getChildren().forEach(coin => {
                coin.enableBody(true, coin.x, coin.y, true, true)
            })
        }

        // Essa parte é para criar as fireballs na borda da tela
        const bounds = this.physics.world.bounds;
        const rect = new Phaser.Geom.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);
        const point = Phaser.Geom.Rectangle.GetPoint(rect, Math.random());

        let fireball = this.fireballGroup.create(point.x, point.y, 'fireball')
        fireball.setVelocityX(Phaser.Math.Between(-100, 100) * 5)
        fireball.setVelocityY(Phaser.Math.Between(-100, 100) * 5)
        fireball.setBounce(1, 1);
        this.scoreTxt.setText(`Score: ${++this.score}`); // podemos usar `${variable}` para colocar variáveis em strings

    }
```

Até que não ficou tão grande, mas agora quando chamamos essa função como o _callback_ do nosso overlap com as moedas (`this.physics.add.overlap(this.player, this.coinsGroup, this.collectCoin);`) daria ela funcionaria, certo? 
Infelizmente a lógica não permite ~~literalmente~~.

Se deixarmos assim será lançado um erro de `undefined` pois tentamo ler o this.pentagramLights dentro do callback, mas por conta do escopo (`this`) ele não existe. por isso precisamos usar como uma arrow function em que o `this` próprio dela não existe, então ela volta e assume o `this` como sendo a da cena. Assim o ovelarp ficaria:

```js
    this.physics.add.overlap(this.player, this.coinsGroup, (player, coin) => { this.collectCoin(player, coin) });
``` 

Agora você deve consegui coletar as moedas e as bolas de fogo aparecerem, mas elas passam pelo Mush como se ele fosse imortal, vamos arrumar isso. Contudo, podemos também adicionar os valores de _score_ no registry, por qual motivo você se pergunta? Pois iremos usar ele na cena de GameOver para mostrar ao jogador o quão gamer ~~ou noob~~ ele é.

# Scenes

Por enquanto só fizemos tudo em uma cena, e o arquivo `Start.js` já está começando a ficar confuso, você pode pensar 'mas não tem nem 200 linhas' e sim, pode parecer pequeno e legível por enquanto, mas pensa se o player tivesse mais movimento, ou uma lógica totalmente nova como _parry_ ou duplo mortal carpado e além disso outras fases com outros desafios e tudo mais, não tem como fazer tudo isso em uma única cena, por isso que separamos as lógicas em cenas distintas, cada uma com seu propósito e relacionamos elas através do `Scene Manager`. No nosso exemplo vamos só criar uma cena que representa a tela de fim de jogo.

> Crie então na pasta ./src do seu projeto o `GameOver.js`, lembre que o `main.js` precia ter acesso a todas as cenas, por isso fazemos o import do GameOver.js do mesmo modo que fizemos com o Start.js, e adicionamos ele na configuração `scene` (scene: [Start, GameOver])


```js 
// ./GameOver.js
import Phaser from "phaser"

export default class GameOver extends Phaser.Scene {
    // Aqui precisamos deixar claro que essa cena é diferente da outra, como não colocamos manualmente o constructor no Start.js o JS já fez isso pra gente e deixou como 'default', se não colocarmos aqui também teremos duas cenas com keys iguais, e o Phaser vai reclamar.
    constructor() {
        super('GameOver')
    }
    create() {
    }
    update() {

    }
}
```

Como será uma cena simples, não precisamos do preload(). Nessa cena vamos somente mostrar o texto *Game Over* bem grande e o score que nosso jogador conseguiu para ele printar e mostrar pros amiguinhos. Então:

```js 
// ./GameOver.js
    create() {
        this.add.text(640, 300, 'Game Over', { fontSize: '60px', fill: '#f75002', fontStyle: 'bold' })
        this.add.text(640, 400, `Score: ${this.registry.get('score')}`, { fontSize: '24px', fill: '#f3f702' })
        this.add.text(640, 500, 'R to retry', { fontSize: '24px', fill: '#16f702' })
    }
```

Aqui temos o `this.registry.get('score')` mas nem demos .set ainda, não têm problema, vamos fazer isso mais para frente, o que importa é que mesmo estando em outra cena, quando salvarmos o _score_ no registry podemos retornar ele em qualquer cena. Também colocamos o `R to retry` então precisamos implementar essa funcionalidade:
Alguns métodos úteis do this.scene:
- this.scene.start(key);
- this.scene.restart(key);
- this.scene.launch(key); A diferença do launch e start é que o start termina a cena atual e e começa a outra, o launch roda a atual junto.
- this.scene.pause(); Pausa a cena atual, mas ainda renderiza.


```js 
// ./GameOver.js
    create() {
        //...
        this.retryKey = Phaser.Input.Keyboard.addKey('R');

    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(this.retryKey)) {
            this.scene.start('Start')
        }
    }
```



