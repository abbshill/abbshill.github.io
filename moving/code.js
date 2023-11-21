let brush = document.getElementById("c").getContext("2d")
let w = 400
let h = 400
dx = 10
let rects = [[50, 95, 50], [160, 130, 50], [300, 50, 50]]

setInterval(drawFrame, 200)

function drawFrame() {
    updateData()
    drawBackground()
    drawRects()
 }

function updateData() {
for (let i = 0; i < rects.length; ++i) {
    rects[i][0] -= dx
    if (rects[i][0] < 0) {
        rects[i][0] = w
    }
}
}

function drawBackground() {
brush.fillStyle = "#DDDDDD"
brush.fillRect (0, 0, w, 3/4*h)
brush.fillStyle = "#00FF00"
brush.fillRect (0, 3/4*h, w, 1/4*h)
}

//math.random  math.floor

function drawRects() {
    for (let i = 0; i < rects.length; ++i) {
        brush.fillStyle = "#FF0000"
        brush.fillRect (rects[i][0], rects[i][1], rects[i][2], 3/4*h-rects[i][1])
    }
}