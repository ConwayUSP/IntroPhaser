# Data Manager

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
            coin.setData("ID", i);
            i++;
        });
        //...
    }
```
Com isso cada moeda vai ter um dado chamado "ID" e podemos pegar esse dado em qualquer parte da cena. Vamos então ver como vai ficar a função de coletar as moedas.

```js
// ./Start.js


    collectCoin(player, coin) {

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
        this.scoreTxt.setText(`Score: ${++this.score}`);

    }
```