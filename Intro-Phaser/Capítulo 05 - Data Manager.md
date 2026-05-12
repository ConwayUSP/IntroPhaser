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
No capítulo 2 criamos os textos de vidas e um timer, e também adicionamos a imagem da lava e fireball, mas não sei se você percebeu, não tem como perder esse jogo ainda porque não colocamos esses assets e um jogo que é impossível perder ainda é um jogo? fica a pergunta.

