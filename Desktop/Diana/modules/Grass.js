var LivingCreature = require("./LivingCreature.js")
var random = require("./random")

module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y);
        this.index = index;
        this.energy = 9;
    }
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply >= 2) {
            grassHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.multiply = 0;
        }
        }

    }
