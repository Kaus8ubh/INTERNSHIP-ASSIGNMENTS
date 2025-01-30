// Initialize value
let countdownValue = 10;
let countdownElement = document.getElementById("countdown");

// Function to update the timer
function updateCountdown() {
    document.getElementById('countdown').style.color = "red";
    // Decrementing the timer
    countdownValue--;

    //showing the countdown value
    countdownElement.textContent = countdownValue;

    // clearing the interval if the countdown value is less than or equal to 0
    if (countdownValue <= 0) {
        clearInterval(countdownInterval)
        countdownElement.textContent = "Time's up!";
    }
}

let begin=document.getElementById('startCountdown')

document.getElementById("startCountdown").addEventListener("click", function () {
    countdownInterval = setInterval(updateCountdown, 1000)
    begin.textContent = "Countdown Started";
    

});