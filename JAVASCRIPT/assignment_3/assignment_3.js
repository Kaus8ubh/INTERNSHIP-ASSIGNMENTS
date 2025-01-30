//Assignment 3: Function with Parameters

//a function that takes two parameters and calculates the area of a rectangle
function calculateArea(length, width) {
    return length * width;
}

//calling the function with different values of length and width
let area1 = calculateArea(8, 10);
let area2 = calculateArea(38, 2);
let area3 = calculateArea(3, 8);

//logging the results to the console
console.log("Area of rectangle with length 8 and width 10 is", area1);
console.log("Area of rectangle with length 38 and width 2 is", area2);
console.log("Area of rectangle with length 3 and width 8 is", area3);
