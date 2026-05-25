# JavaScript

> Antes de começar, é bom deixar claro que não é necessário conhecimento prévio de JS para trabalhar com Phaser ~~eu mesmo não tinha~~, se você já possui noções básicas de programação e quiser ir direto para a [Intro-Phaser](../Intro-Phaser/Capítulo%2000%20-%20%20Apresentação.md) fique à vontade.

O JavaScript é uma linguagem de programação que foi criada com um propósito claro de ser usada na World Wide Web, que já conseguia rodar Java com (Java Applets) em algumas aplicações e pra pegar a fama do Java surgiu o nome JavaScript, que têm uma sintaxe um pouco parecida mesmo com Java mas a semântica e a utilidade é bem diferente. Como é uma linguagem muito usada e relativamente antiga, ela está sempre atualizada e mudanças são recorrentes.

Assim como em várias linguagens o JS não muda muito as ideias de sintaxe geral:
- Chaves { } para criar blocos de código.
- Ponto e vírgula ; para encerrar uma instrução.
- Estruturas de controle: if, else, for, while, switch.
- Símbolos matemáticos e lógicos: +, -, && (E), || (OU).

Porém existem `keywords` específicas e ideias novas coma ela, vamos começar pelas variáveis.

> Temos vários meios de debug mas o mais importante é se habituar com o console.log() que mostra no console do DevTools do browser (F12) e entender o que cada erro significa.


## Variáveis


As criações de variáveis são diretas, como ela é uma linguagem com tipagem dinâmica a gente não precisa definir o tipo da variável em sua criação, apenas usando a keyword `let` e saber um tipo de variável usando `typeof`. Também é possível criar constantes com `const` se você não quiser que ela varie, pode não parecer mas uma variável que não ~~vareia~~ é muito útil e ajuda na interpretabilidade do seu código.

```js
const hero = "Jojo";
let bestJojo = "Giorno Giovanna";
bestJojo = 5; // podemos mudar o tipo quando há atribuição
typeof(hero); // string - Podem ser (number, string, boolean, array, object)
```
Aqui podemos ver também a convenção adotada, variáveis começam com letra minúscula e usa Maiúscula quando começar outra palavra. 

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




