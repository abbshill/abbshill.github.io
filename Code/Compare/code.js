function get_max(){
    //get numbers from input boxes
    let a = document.getElementById("b1").valueAsNumber
    let b = document.getElementById("i2").valueAsNumber
    let c = document.getElementById("i3").valueAsNumber
    //compare numbers
    let max = a
    if (b > mac) {
        max = b
    }
    if (c > mac) {
        max = c
    }
    //display the max
    document.getElementById("max").innerHTML = max
}
document.getElementById("b1").addEventListener("click", get_max)