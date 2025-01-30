//Assignment 4: Array Manipulation

//array with of 10 integers between 1 and 100
let numbers = [38, 27, 92, 58, 83, 96, 27, 68, 97, 10];

//writing a function that takes an array as a parameter

//function that takes array as a parameter and returns maximum number, 
// minimum number and average of all numbers

function myFunction(array) {
    //maximum number
    let maximum = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > maximum) {
            maximum = array[i];
        }
    }
    console.log("Maximum number in the array is", maximum);

    //minimum number
    let minimum = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minimum) {
            minimum = array[i];
        }
    }
    console.log("Minimum number in the array is", minimum);

    //average of all numbers
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    let average = sum / array.length;
    console.log("Average of all numbers in the array is", average);

}
