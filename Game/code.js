let brush = document.getElementById("c").getContext("2d")
let w = 400
let h = 400
let birdX = 50
let birdY = 200 
let birdDy = 0 //delta increase alon y axis in each interval
let birdSize = 20
let g = 1 //gravity
let jumpImpact = 20 //speed increase along y axis when you press space bar
let timerId = null;
let pipes = [[100, 50, 50, 100],[300, 100, 50, 80],[500, 80, 40, 50]] // element is an array of four data [x,y,w,h] of the pass
let pipeDx = 2
let score = 0
document.addEventListener("keydown", onkeydown)
drawFrame()
function isXyInRect (x, y, rx, ry, rw, rh) {
    if (x > rx && x < rx+rw && y > ry && y < ry+rh) {
        return true
    } else {
        return false
    }
}
function gameOver() {
    clearInterval(timerId)
        brush.fillStyle= "#000000"
        brush.textAlign = "center"
        brush.textBaseline = "top"
        brush.font = "30px Arial"
        brush.fillText ("GAME OVER", w/2, h/2)
}

function processCollision() {
    // if the bird hits the upper pipe
    for (let i = 0; i < pipes.length; ++i) {
        let pipe = pipes[i]; // [100, 50, 50, 100]
        if (
            isXyInRect(birdX, birdY, pipe[0], 0, pipe[2], pipe[1]) ||
            isXyInRect(birdX + birdSize, birdY, pipe[0], 0, pipe[2], pipe[1]) ||
            isXyInRect(birdX, birdY, pipe[0], pipe[1] + pipe[3], pipe[2], h - pipe[1] - pipe[3]) ||
            isXyInRect(birdX + birdSize, birdY + birdSize, pipe[0], pipe[1] + pipe[3], pipe[2], h - pipe[1] - pipe[3])
        ) {
            gameOver();
            break;
        }
    }

    // if the bird hits the top or bottom edge
    if (birdY <= 0 || birdY >= h) {
        gameOver();
    }
}
  

function drawPipes () {
    brush.fillStyle = "#00FF00"
    for (let i = 0; i < pipes.length; ++i) {
        let pipe = pipes[i] // [100, 50, 50, 100]
         //draw the upper pipes
        brush.fillRect(pipe[0],0, pipe[2], pipe[1] )
    //draw lower pipes
        brush.fillRect(pipe[0], pipe[1]+pipe[3], pipe[2], h-pipe[1]-pipe[3])
    }
   
}

function onkeydown(e) {
    if(e.key === "Enter") {
        resetData()
            clearInterval(timerId)
            timerId = setInterval(drawFrame, 20)
        }
     else if (e.key === " ") {
        birdDy -= jumpImpact
    }
}
function resetData() {
    birdY = 200;
    birdDy = 0;
    score = 0;
    pipes =  [[500, 50, 50, 120],  // Increase the initial distance between the bird and the first pipe
    [300, 100, 50, 100],
    [500, 80, 40, 150]
];
}

function drawFrame() {
    updateData()
    drawBackground()
    drawPipes()
    drawBird()
    processCollision()
}

function updateData () {
    birdDy += g // speed increase by the gravity
    birdY += birdDy //y position increasement by birdDy
    // update the pipes
    for (let i = 0; i < pipes.length; ++i) {
        let pipe = pipes[i] // [100, 50, 50, 100]
       pipe[0] -= pipeDx
       if (pipe[0]+pipe[2] <= 0) {
        pipe[0] = w + Math.floor(Math.random()*100 + 50)
        ++score
        document.getElementById("h").innerHTML = "Score: " + score
       }
    }
}

function drawBird() {
    // Body
    brush.fillStyle = "#f3f70f"; // Yellow color for the body
    brush.fillRect(birdX, birdY, birdSize, birdSize);

    // Left Eye
    brush.fillStyle = "#000000"; // Black color for the eyes
    brush.fillRect(birdX + birdSize * 0.2, birdY + birdSize * 0.2, birdSize * 0.1, birdSize * 0.1);

    // Right Eye
    brush.fillRect(birdX + birdSize * 0.7, birdY + birdSize * 0.2, birdSize * 0.1, birdSize * 0.1);

    // Left Beak
    brush.fillStyle = "#e76d32"; // Orange color for the beak
    brush.beginPath();
    brush.moveTo(birdX + birdSize * 0.4, birdY + birdSize * 0.5);
    brush.lineTo(birdX + birdSize * 0.5, birdY + birdSize * 0.45);
    brush.lineTo(birdX + birdSize * 0.5, birdY + birdSize * 0.55);
    brush.fill();

    // Right Beak
    brush.beginPath();
    brush.moveTo(birdX + birdSize * 0.5, birdY + birdSize * 0.5);
    brush.lineTo(birdX + birdSize * 0.6, birdY + birdSize * 0.45);
    brush.lineTo(birdX + birdSize * 0.6, birdY + birdSize * 0.55);
    brush.fill();

    // Wing
    brush.fillStyle = "#f3f70f"; // Same color as the body
    brush.beginPath();
    brush.moveTo(birdX, birdY + birdSize * 0.5);
    brush.lineTo(birdX - birdSize * 0.1, birdY + birdSize * 0.7);
    brush.lineTo(birdX, birdY + birdSize);
    brush.closePath();
    brush.fill();
}


function drawBackground() {
    brush.fillStyle = "#85C1E9" //sky
    brush.fillRect(0, 0, w, 12/16*h)
    brush.fillStyle = "#000000" //seperataor
    brush.fillRect(0, 12/16*h, w, 1/16*h)
    brush.fillStyle = "#F5B041" //ground
    brush.fillRect(0, 13/16*h, w, 3/16*h)
}
