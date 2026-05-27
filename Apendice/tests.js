class Game {

    constructor(name, type) {
        this.name = name; // nome do jogo
        this.type = type; // tipo (2D, roguelike, MMO, etc)
    }
    getName() {
        return this.name;
    }
}
const myObj = new Game("mario67", "4D");
console.log(myObj.getName()); 