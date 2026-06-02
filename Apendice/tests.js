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
        this.lifeValue = 200; // ...ou dentro
        this.spells.push('Leap', 'Charge', 'Slam', 'Rend'); // se for usar um método tem que ser dentro de outro método
    }
}
let warchief = new Warrior('Garrosh', 'Orc');
warchief.didNothingWrong = true; // podemos criar propriedades únicas aquela instância, mas não é muito recomendado
warchief.takeDmg(); // mesmo sem definir o takeDmg() na classe Warrior, por conta do extends ele existe e pode ser chamado
console.log(warchief.lifeValue);
console.log(warchief.getName());
