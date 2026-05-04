
# O que são Game Objects?

Praticamente tudo que se faz presente na tela no Phaser (brincadeira mas nem tanto).
São os textos, imagens, sprites, grupos, particulas... Como existem [**VÁRIOS**](https://docs.phaser.io/phaser/concepts/gameobjects) abordaremos os mais interessantes.

Todos os game objects estão vinculados a uma cena e usam a classe `Phaser.GameObjects` como base, e nele existem vários métodos que podem ser usados, como a criação e exclusão. Você sempre pode criar novas classes que _extends_ as classes do Phaser para o seu jogo, mas a framework tem o intuito de ser amigável e por isso existem meios de se adicionar os seus _assets_ mais facilmente, no nosso exemplo vamos usar eles mas fique à vontade em explorar os meios de OOP.

>Lembre-se que se for criar novas classes é bom dar uma olhada em [como](https://docs.phaser.io/api-documentation/api-documentation) elas são requeridas.


## Game Object Factories

De acordo com o nome é ela que cria os nossos game objects dentro da nossa cena e é relativamente simples. Existem dois métodos: o `.add` e o `.create`, ambos criam o objeto mas o último consegue usar algumas configurações pré-definidas por você. É uma classe bem simples mas de imensa ajuda, pois não precisamos nos preocupar em como criar eles e também o objeto já fica compartilhado entre as cenas. Vamos ver eles então na prática, começando pelo (talvez) mais básico.

# Graphics

Um objeto do tipo `graphics` consegue desenhar na tela, usando WebGL ou Canvas, formas geométricas simples como retângulo, círculos e polígonos. Mesmo que básicos podem ser muito úteis para certas ocasiões, como por exemplo delimitar áreas do seu jogo ou fazer debug, no geral eles são mais usados para HUD pois consomem bastante memória para serem renderizados, então a idéia é usar para coisas que precisam ser dinâmicas e calculadas em _runtime_ (barra de loading, por exemplo). Não iremos usar `graphics` no nosso jogo mas você pode criar um e testar ele assim:

>O Phaser tem três pelo menos meios de desenhar na tela, o `graphics` que é mais básico e pode desenhar várias coisas ao mesmo tempo, os `shapes` que são objetos próprios capazes de sofrerem mudança de escala, rotação, etc e a partir dos `paths` que faz parte do Phaser.Math e recebe tipos `graphics`

```js
// se for brincar, pode usar dentro do método create do seu Start.js

// desenha um triângulo, uau (agradeça ao WebGL)
let triangle = this.add.graphics()
triangle.lineStyle(5, 0xff00ff, 1.0);
triangle.fillStyle(0xff00ff, 1); 
triangle.beginPath();
triangle.moveTo(100, 100);
triangle.lineTo(200, 200);
triangle.moveTo(100, 200).lineTo(200, 200);
triangle.lineTo(100, 100);
triangle.closePath();
triangle.fillPath();
triangle.strokePath();

// ou simplesmente (porém isso é um shape do tipo Triangle)
let easyTriangle = this.add.triangle(300, 50, 100, 100, 200, 200, 100, 200, 0xff00ff);

// ou um triângulo isométrico (piramide shape)
let isoTriangle = this.add.isotriangle(
    600,
    180,
    100,
    70,
    true, // true == invertida
    0x0000ff,
    0x00ff00,
    0xff0000
);

// e também curvas (criamos um objeto que é SplineCurve do Phaser.Curves e usamos o .draw para desenhar com o graphics)

let curveObject = new Phaser.Curves.Spline([50, 300, 150, 450, 350, 300, 450, 500]);
let curveGraphics = this.add.graphics().lineStyle(3, 0xffffff, 1);
curveObject.draw(curveGraphics, 64);

```
> Você vai perceber que existem algumas maneiras diferentes de escrever um código e ter o mesmo resultado, parte por conta do próprio desenvolvimento do Phaser e parte por detalhes que deixam os meios fundamentalmente diferentes.

# Images e Sprites

Com o `images` fazemos nossas imagens, e com `sprites` nossas sprites. Não estamos duvidando de sua capacidade intelectual, mas é praticamente só isso mesmo. O pulo do gato é que o Phaser já tem um **manager** que cuida desses game objects, que é o _Texture Manager_, é nele que ficará guardado seus desenhos e a maioria de todos os game objects que são renderizados passam pelo textures. A diferença principal entre uma imagem e um sprite é o fato das sprites terem o componente das animações também.

Normalmente nós usamos `images` para desenhos estáticos, como logo, _background_, cenário... e no nosso exemplo vamos criar o cenário e o fundo, então baixe as imagens **background.png** e **scenery.png** de dentro de Apendice/jogo-exemplo/public (colocar imagens) e salve na pasta `public` do seu projeto, e agora já podemos carregá-las com `load` e adicionar na cena com `add`.

```js 

// ./src/Start.js
    preload() {
        this.load.image('background', 'background.png');
    }

    create() {
        this.add.image(950, 450, 'background');
    }

```

Se nada explodiu ainda você deve ver sua imagem renderizada, **LEMBRE** sempre que a ordem de adicionar importa como em uma fila, então se por exemplo você adicionar o cenário antes do fundo e começar a questionar suas escolhas de vida quando o cenário não aparece, é porque a imagem do fundo está cobrindo o cenário. Por isso existe o `setDepth()` onde você tem controle sobre essa ordem. Além dele existe:





