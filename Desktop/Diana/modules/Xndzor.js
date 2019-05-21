var LivingCreature = require("./LivingCreature.js")
module.exports = class Xndzor extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 9;
    }
    getNewDirection() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewDirection();
        return super.chooseCell(character);
    }
    mult() {
        var array = this.chooseCell(0);
        var empty = array[Math.floor(Math.random() * array.length)];
        if (empty && this.energy > 6) {
            XndzorStatics++
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 5;
            var ar = new Xndzor(newX, newY);
            XndzorArr.push(ar)
        }
    }
    move() {
        var array = this.chooseCell(0);
        var empty = array[Math.floor(Math.random() * array.length)];
        this.energy -= 3
        if (empty) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        var array = this.chooseCell(3);
        var food = array[Math.floor(Math.random() * array.length)];
        if (food) {
            var newX = food[0];
            var newY = food[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            for (var i in GishatichArr) {
                if (GishatichArr[i].x == newX && GishatichArr[i].y == newY) {
                    GishatichArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 4;
        }
    }
    eat2() {
        var array = this.chooseCell(4);
        var food = array[Math.floor(Math.random() * array.length)];
        if (food) {
            var newX = food[0];
            var newY = food[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            for (var i in AmenatesArr) {
                if (AmenatesArr[i].x == newX && AmenatesArr[i].y == newY) {
                    AmenatesArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 3;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in XndzorArr) {
                if (XndzorArr[i].x == this.x && XndzorArr[i].y == this.y)
                    XndzorArr.splice(i, 1)
            }
        }
    }
}