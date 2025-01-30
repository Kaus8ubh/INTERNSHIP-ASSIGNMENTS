//Assignment 2: Basic Arithmetic Operations and Conditional Statements

//two variables for numbers
let number_1=28;
let number_2=8;

//addition
let sum = number_1 + number_2;

//subtraction
let difference = number_1 - number_2;

//multiplication
let product = number_1 * number_2;

//division
let division = number_1 / number_2;

//results

console.log("Sum of", number_1, "and", number_2, "is", sum);
console.log("Difference of", number_1, "and", number_2, "is", difference);
console.log("Product of", number_1, "and", number_2, "is", product);
console.log("Division of", number_1, "and", number_2, "is", division);

//a conditional statement that checks if 
//the result of the division is greater than 10 or less than 10
if(division>10){
    console.log("Division is greater than 10");
} else if(division<10){
    console.log("Division is less than 10");
} else{
    console.log("Division is equal to 10");
}
