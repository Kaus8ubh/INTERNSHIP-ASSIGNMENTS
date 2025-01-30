//function chaining

class calculator {
    constructor() {
        this.value = 0;
    }
    add(num) {
        this.value += num;
        return this;
    }
    subtract(num) {
        this.value -= num;
        return this;
    }
    multiply(num) {
        this.value *= num;
        return this;
    }
    divide(num) {
        this.value /= num;
        return this;
    }
    getResult() {
        return this.value;
    }
}

const calc = new calculator();
const resul = calc.add(5).subtract(2).multiply(3).divide(2).getResult();
console.log(resul);