# JavaScript

> Antes de começar, é bom deixar claro que não é necessário conhecimento prévio de JS para trabalhar com Phaser ~~eu mesmo não tinha~~, se você já possui noções básicas de programação e quiser ir direto para a [Intro-Phaser](../Intro-Phaser/Capítulo%2000%20-%20%20Apresentação.md) fique à vontade.

O JavaScript é uma linguagem de programação orientada a objetos multiplataforma que foi criada com um propósito claro de ser usada na World Wide Web, que já conseguia rodar Java com (Java Applets) em algumas aplicações e pra pegar a fama do Java surgiu o nome JavaScript, que têm uma sintaxe um pouco parecida mesmo com Java mas a semântica e a utilidade é bem diferente. Como é uma linguagem muito usada e relativamente antiga, ela está sempre atualizada e mudanças são recorrentes. Não vamos focar aqui nas infinitas bibliotecas e métodos de todos os objetos, apenas ter uma noção geral da linguagem.

Assim como em várias linguagens o JS não muda muito as ideias de sintaxe geral:
- Chaves { } para criar blocos de código.
- Ponto e vírgula ; para encerrar uma instrução.
- Estruturas de controle: if, else, for, while, switch.
- Símbolos matemáticos e lógicos: +, -, && (E), || (OU).

Porém existem `keywords` específicas e ideias novas com ela, vamos começar pelas variáveis.

> Temos vários meios de debug mas o mais importante é se habituar com o console.log() que mostra no console do DevTools do browser (F12) e entender o que cada erro significa.

## Variáveis e tipos

As criações de variáveis são diretas conseguindo fazer apenas usando a keyword `let` e saber um tipo de variável usando `typeof`. Também é possível criar constantes com `const` se você não quiser que ela varie, pode não parecer mas uma variável que não ~~vareia~~ é muito útil e ajuda na interpretabilidade do seu código.

```js
const hero = "Jojo";
let bestJojo = "Giorno Giovanna";
bestJojo = 5; // podemos mudar o tipo quando há atribuição
typeof(hero); // string
```
Aqui podemos ver também a convenção adotada, variáveis começam com letra minúscula e usa Maiúscula quando começar outra palavra. 

Já os tipos são um pouco diferentes, em C por exemplo temos os tipos primitivos `int` `char` `float` etc, como JS é orientada a objetos e tem tipagem dinâmica não deu erro quando reatribuimos o bestJojo com um número, sendo que ele era uma string. JS também tem seus tipos primitivos:

- **boolean**: `true` e `false`.
- **null**: Um tipo específico para denotar um Null value.
- **undefined**: Tipo para valores não definidos.
- **number**: Um inteiro ou decimal.
- **BigInt**: Um inteiro muito grande.
- **string**: Uma série de caracteres.
- **symbol**: Um tipo para valores que são garantidamente únicos.

E por fim existem os tipo de referência (pode pensar como uma struct em C) que são os **Objects**.

## Operações

JS suporta as operações básicas, `+ - / *` esperamos que você saiba o que significa, mas também existe:
- `%` operador de módulo (ou resto) que retorna justamente o resto, por exemplo 8 % 3 = 2 já que a conta é 2 com resto 2.
- `**` é o expoente então 3**2 = 9.
A precedência das operações funciona da forma esperada na matemática e assim como outras linguagens existe o incrementador `++` e decrementador `--` usado nas variáveis. Também como a atribuição com operação (`+=`, `*=`, `/=`, `-=`) e por fim, mas o mais importante pois já foi usado algumas vezes, o sinal de atribuição `=`.

Também existem os comparativos que retornam booleanos e no JS tem um detalhe a mais. Nas outras linguagens conhecemos os `>` `<` `<=` `>=` que significam exatamente o que você está pensando e por conhecimentos prévios quando você quiser saber se duas variáveis são iguais ou diferentes usa o `==` `!=`. No JS essa sintaxe existe e é válida mas é preciso tomar cuidado com o que significa e por isso existe outra:

```js
4 == 4 // true, como esperado
4 == "4" // true também? Sim pois aqui somente testa os valores e dependendo da sua lógica você esperava false 
4 === "4" // False como queriamos. Por isso usa o condicional '===' e '!==' se você quer ter certeza que os tipos são iguais também
```

Outro "problema" bem comum é o [floating pointing error](https://en.wikipedia.org/wiki/Floating-point_arithmetic) que pode ser um grande problema se houver descuido, por exemplo, o que retornaria a comparação `0.1 + 0.2 === 0.3` ? Um ser alfabetizado em números decimais diria `true` já que são do mesmo tipo e mesmo valor mas se fosse assim não estaria falando sobre isso, a verdade é que da `false` justamente pela aritmética usada, portanto tome cuidado.

## Loops e controle de fluxo

Toda linguagem de programação precisa de um meio para repetir instruções e um controle do fluxo e o JS é bem parecido com as outras linguagens também na sintaxe, os _loops_ mais comuns são:

```js
// for 
for (let step = 0; step < 5; step++) {
  console.log(step);
}
// while 
while (true) {
    if (true) {
        break;
    }
    console.log("wow");
}
// for .. in [..] e for .. of [..] (um itera sobre os "nomes" do objeto e outro sobre os valores)
const arr = [3, 5, 7];
for (const i in arr) {
    console.log(i);  // "0" "1" "2", nesse caso os nomes são os índices
}

for (const i of arr) {
    if (i === 5) {
        continue;
    }
    console.log(i); // 3 7
}
```

## Funções

Para deixar seu código modularizado e compreensível o uso de funções é essencial e no JS podemos fazer algumas coisas diferentes de outras linguagens com funções, porém o conceito é o mesmo.

```js
//para criar uma função usamos:
function tetra(x) {
    return x**(x**x);
}
```
No JS todos os parâmetros são passados pelo **valor**, ou seja, se você alterar o valor do parâmetro dentro da função isso não é refletido na chamada dela mas agora é que precisamos ter cuidado com a natureza de orientação à objetos do JS:

```js
let JojoBro = "Caesar";
function killJojoBro(name) {
    name = "SHIZAAAA"; 
}
killJojoBro(JojoBro);
console.log(JojoBro); // mostra Caesar, ou seja, não morreu

let bestParts = [5, 7];
function changeBestParts(bestParts) {
    bestParts[0] = 4; 
    bestParts[1] = 8; 

}
console.log(bestParts); // [5, 7]
changeBestParts(bestParts);
console.log(bestParts); // [4, 8] aqui mudou pois arrays são objetos no JS e quando passamos objetos pegamos só a referência deles
```
Também podemos guardar funções em variáveis, e isso é possível pois funções também são objetos, então podemos fazer coisas complexas como:

```js
function map(f, a) { // passamos uma função 'f' e um array 'a'
  const result = new Array(a.length); // o 'new' é a keyword que cria um objeto e todo Array tem um método length que retorna o tamanho
  for (let i = 0; i < a.length; i++) {
    result[i] = f(a[i]); // populamos o 'result' com o resultado da função 'f' chamada em cada termo do array 'a'
  }
  return result;
}
const numbers = [0, 1, 2, 5, 10]; // esse é nosso array 'a'
const cubedNumbers = map(function (x) {
  return x * x * x;
}, numbers); // colocamos a função direto no parâmetro
console.log(cubedNumbers); // [0, 1, 8, 125, 1000]
```
Mas a parte mais importante e utilizada são as __arrow functions__ que foram criadas para deixar o código menor e mais limpo e você nem precisa dar um nome para a função se ela for usada com _callback_, ou seja, quando uma outra função espera uma função como parâmetro, como no exemplo anterior, ficaria assim:

```js
const cubedNumbers = map(x => x * x * x, numbers); 
```

> Elas também são muito úteis quando trabalhamos com as classes e objetos, isso fica mais claro na Intro-Phaser

Uma funcionalidade muito útil também é a possibilidade de passar vários parâmetros de uma só vez com a sintaxe dos `...parametro`, por exemplo:

```js
function printJojos(...jojos) {
    console.log(jojos);
}
printJojos('Jonathan', 'Joseph', 'Jotaro', 'Josuke', 'Giorno', 'Jolyne', 'Johnny', 'Jo2ke', 'Jodio'); // o JS vai transformar isso em um array-like
```

## Classes e Objetos

Como dito anteriormente, não vamos destrinchar as classes que o JS dispôe, até porque usamos as do Phaser para nosso propósito, e também sobre o conceito de OOP (novamente veja na trilha de C++), mas a ideia geral sobre como elas funcionam no JS é a mesma em outras linguagens com o paradigma de orientação à objetos, além da sintaxe ser parecida:

```js
// Se quisermos criar um objeto solto
const obj = { // usamos chaves para inicializar um objeto

  property1: value1, // propriedades podem ser nomes
  2: value2, // numeros
  "property n": value3, // ou strings
}
// A partir de uma classe
class Game {
    static totalGames = 0;
    constructor(name, type) { // método de criação
        this.name = name; // nome do jogo
        this.type = type; // tipo (2D, roguelike, MMO, etc)
        Game.totalGames++;
    }
    getName() {
        return this.name;
    }
}
const mario = new Game("Mario67", "4D");
const zelda = new Game("Zelda o carinha of timão", "VR");

console.log(mario.getName()); // mario67
console.log(Game.totalGames); // 2
```
Em resumo bem resumido, o `this` está se referindo à instância criada da classe, ou seja, ao **objeto** em si e quando definimos uma variável `static` ela é ligada a **classe**. O _constructor_ é um método muito importante pois é nele que chega os parâmetros que você passa quando cria uma instância daquela classe.

Contudo a parte mais importante para nosso caso é o fato de classes podem "pegar emprestado"/"extender" outras classes, sem ter que ficar copiando código adoidado e isso é muito poderoso quando seu projeto começa a ficar grande e você precisa de uma organização maior, a gente faz isso com o `extends`:

```js
// Um exemplo bem tosco
class Character {
    spells = ['Heartstone', 'Mount']; 
    lifeValue = 100;
    resourceType = 'Mana'
    constructor(name, race) {
        this.name = name;
        this.race = race;
    }
    takeDmg() {
        this.lifeValue--;
    }
    getName() {
        return this.name; // como usamos o super na outra classe, temos acesso ao nome correto
    }
}
class Warrior extends Character {
    resourceType = 'Rage'; // podemos sobrescrever fora do construtor...
    constructor(name, race) {
        super(name,race); // o super faz com que os parâmetros que enviamos quando criamos o Warrior seja passado para o Character também
        this.lifeValue = 200; // ...ou sobrescrever dentro
        this.spells.push('Leap', 'Charge', 'Slam', 'Rend'); // se for usar um método tem que ser dentro de outro método
    }
}
let warchief = new Warrior('Garrosh', 'Orc');
warchief.didNothingWrong = true; // podemos criar propriedades únicas aquela instância, mas não é muito recomendado
warchief.takeDmg(); // mesmo sem definir o takeDmg() na classe Warrior, por conta do extends ele existe e pode ser chamado
console.log(warchief.lifeValue);
console.log(warchief.spells);
```
Nesse exemplo nós criamos uma classe `Character` que contém algumas propriedades e métodos que sejam comuns a todos os personagens, depois fizemos outra classe `Warrior` que _extends_ o `Character`, ou seja, o que definimos na primeira classe já está ~~magicamente~~ criado dentro da segunda classe. No nosso exemplo do Phaser não vamos usar muito a criação ou (extensão?) de classes pois ele já tem as nativas, mas se o projeto for grande é muito mais pratico criar arquivos diferentes e extender as classes do Phaser para eles, podendo então configurar do jeito que for melhor.

> É possível não colocar o construtor nas classes porém o JS vai colocar por baixo dos panos, então ele meio que sempre existe e se for uma classe que extende outra, ele já coloca o _super()_ também

# Conclusão

Nessa introdução bem superficial vimos a sintaxe e um pouco do modo de escrever em JS, felizmente para nosso propósito usando o Phaser a gente não vai precisar das classes e métodos nativos de JS para Web pois o Phaser tem tudo isso adaptado para jogos, se você for ler um script real em JS verá muitas coisas bem diferentes e isso é provavelmente por conta das milhares bibliotecas e "plugins" e frameworks que o JS possui por conta de ser tão famoso, mas não se preocupe com isso, na intro-Phaser fica mais fácil de entender alguns conceitos.
Portanto, hora da parte [legal](../Intro-Phaser/Capítulo%2000%20-%20%20Apresentação.md).