# Capítulo 00: Apresentando o Phaser

Estão preparados para o maior e melhor ~~de acordo com eles mesmos~~ framework de jogos HTML5? 
Se sim, está no lugar certo.
Se não, está no lugar mais certo ainda porque é aqui que preparamos novos desenvolvedores para mostrar do que ele é capaz.

## 0.1 O que é?

Como já dito no README, o Phaser é uma framework (meio de trabalho) para desenvolver jogos para a web, muitos dizem ser o sucessor do Flash Player, que foi o principal expoente nos anos 2000 com jogos icônicos como _Club Penguin_ e _Happy Whells_, mas teve seu fim declarado em 2020 após a Apple ~~matar~~ decidir não suportar mais a plataforma em dispositivos iOS e com o surgimento do mais poderoso HTML5.

Assim o Phaser, que já estava em desenvolvimento há um tempo, ganhou força no mercado e se tornou o padrão para essa área, conseguindo entregar jogos em toda aplicação que tenha suporte para o HTML5.
Contudo há suas limitações, a própria plataforma afirma que o Phaser **NÃO** é recomendado se você quiser: 

```
Criar um jogo totalmente em 3D.
Publicar seu jogo em consoles, como Playsation, Xbox, Nintendo's.
Não aprender/usar Javascript e precisa de um editor completo como Godot, Unity, Unreal, etc.
```

_O Phaser até tem um editor que está cada vez mais completo, porém custa `dinheiros` e por isso não vamos abordar ele aqui, mas é até melhor usar sua IDE de preferência para fazer o seu jogo, ou seja, o curso será totalmente baseado em código JS_.

No mundo real, como é relativamente fácil e rápido criar seu jogo e já subir ele (iremos usar o termo _subir_ como sinônimo de _colocar ele no browser para jogar_) o Phaser é muito usado para criação de protótipos e idéias simples, que possivelmente serão transportadas para uma engine mais robusta se for o caso. Isso aconteceu com o **Vampire Survivors** que teve seu desenvolvimento inicial no Phaser mas como explodiu nas mãos do público e praticamente criou um estilo de jogo novo, eles migraram para o Unity.


## 0.2 O que veremos nos capítulos?

A partir da [documentação](https://docs.phaser.io/) temos, pelo menos, **23** conceitos diferentes através de suas classes. Até poderiamos abordar todos aqui mas acreditamos que não seria produtivo, de qualquer forma incentivamos a usar o _docs_ sempre que quiser aprender algo novo não mostrado aqui ou aprofundar mais sobre o conceito.

A partir de uma escolha totalmente baseada em instintos, iremos por enquanto nos ater à (não necessariamente nessa ordem):

- Animações
- Áudio
- Câmeras
- Controle de Dados
- Eventos
- _Game Objects_
- _Inputs_
- _Arcade Physics_
- Cenas
- _Tweens_ (animações especiais)

Já da pra fazer muita coisa com esses conceitos e iremos mesclar uns com outros não mostrados aqui, mas não chega perto do que o Phaser é capaz, por isso novamente reforçamos a usar o docs disponibilizados por eles. Durante os capítulos também criaremos na prática um joguinho de plataforma. (Se só quiser a versão final está no Apêndice)

## 0.3 Depois de criar, como subir o joguinho?

Mas é claro, como pudemos esquecer 😱😱😱, do que adianta criar um jogo se ninguém vai jogar.

Portanto, para isso usaremos a ferramenta _Vite_ que com ela é simples e rápido você criar sua _build_ do jogo e subir em plataformas que aceitem HTML5 (como o itch.io), também muito útil para testar localmente as mudanças e os inúmeros problemas que aparecem no desenvolvimento.

>Vite não é um server de produção capaz de publicar o jogo ou aplicação na web, ele é um server de desenvolvimento local, existem diversos outros que podem ser utilizados porém acreditamos que o Vite é o mais adequado para nosso contexto.

Para isso vamos fazer um passo-a-passo em como criar seu localhost.

### Instalando o NPM

O _Node Package Manager_ vai ser nosso salvador em como executar o _Vite_ para rodar nossos arquivos .js no browser. Então:


-- No Windows: Baixe o [Nodejs](https://nodejs.org/pt-br/download/current) para Windowns usando Docker com npm e siga as instruções de comandos para verificar se está tudo correto

-- No Linux: O mesmo caminho, basta mudar no [Nodejs](https://nodejs.org/pt-br/download/current) para Linux usando nvm com npm

### Configurando e instalando o Vite

Após confirmar que já estar instalado o npm vamos usar ele para criar nosso projeto, para isso no seu terminal, dentro da pasta que deseja criar o projeto, rode o comando: 

`npm create vite`

Irá aparecer algumas opções para você escolher como será configurado o projeto: 
- Escolha o nome (será só o nome da pasta).
- Escolha a framework (deixe Vanilla, já é o suficiente).
- Escolha Javascript.
- Pode instalar com npm já (Yes).

Agora você já tem seu localhost 🔥🔥🔥
Para ver no browser use o comando `o` e para fechar use `q`.

Quando abrir irá ver a tela padrão do Vite, se der algum problema delete a pasta do projeto e instale denovo.
Depois de estar tudo nos conformes, aconselho excluir tudo das pastas `src` e `public` (os conteúdos, não as pastas em si) pois não precisamos dessa tela inicial do Vite. O `src` por padrão será onde vai ficar nossos arquivos .js e o `public` onde ficará os _assets_ do jogo, como sprites, áudios...

### Mas e o Phaser?

Podemos rodar no terminal, dentro da pasta criada pelo Vite: 

`npm install phaser`

e pronto. Simples e prático.

Agora vamos pro ´Hello Phaser´, o Vite sempre vai procurar um arquivo `main.js` (no diretório principal ou no `src`) então modificamos ou criamos um e colocamos o seguinte código: 

> Não se preocupe com o que cada linha faz, veremos tudo isso!
```js
import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 600,
    scene: {
        create() {
            this.add.text(100, 100, "Hello Phaser!", { fill: "#fff" }).setFontSize(150);
        }
    }
};

new Phaser.Game(config);
```
E agora quando você rodar `npm run dev` no diretório do projeto _voilá_, estará o Hello Phaser na tela.

## Conclusões

Neste começo criamos nosso localhost e vimos como abrir ele no navegador, agora vamos ver as classes que o Phaser disponibiliza para nós criarmos grandes, médios e pequenos joguinhos para a web.
