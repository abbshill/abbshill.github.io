function get_money() {

let normal_rate = document.getElementById("d2").ValueAsNumber
let overtime_rate = document.getElementById("d3").ValueAsNumber
let hours_worked = document.getElementById("d4").ValueAsNumber
let normal_hours = document.getElementById("d1").ValueAsNumber

// write a piece of code to get the money earned today
let money;
if (hours_worked <= normal_hours) {
    money = hours_worked * noramal_rate
} else {
    money = normal_rate * normal_hours 
    money += (hours_worked-normal_hours)*overtime_rate
}
document.getElementById("result").innerHTML = money + " dollars"
}
get_money()
function calculateWage() {
    // Get user input
    const hoursWorked = document.getElementById('hoursWorked').valueAsNumber;
    const hourlyPayRate = document.getElementById('hourlyPayRate').valueAsNumber;
    const overtimePayRate = document.getElementById('overtimePayRate').valueAsNumber;

    // Check if input is valid
    if (isNaN(hoursWorked) || isNaN(hourlyPayRate) || hoursWorked < 0 || hourlyPayRate < 0) {
        alert('Please enter valid hours worked and hourly pay rate.');
        return;
    }

    // Calculate wages
    let totalWage;

    if (hoursWorked <= 8) {
        totalWage = hoursWorked * hourlyPayRate;
    } else {
        const regularHours = 8;
        const overtimeHours = hoursWorked - regularHours;
        totalWage = (regularHours * hourlyPayRate) + (overtimeHours * overtimePayRate);
    }

    // Display the result
    const wageResultElement = document.getElementById('wageResult');
    wageResultElement.textContent = totalWage.toFixed(2);
}