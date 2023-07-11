let grid;
let grid_new;
let score = 0;
let highscore = 0;

function setup() {
    createCanvas(620, 620);
    highscore = getItem("highscore");
    if (highscore !== undefined && highscore !== "" && highscore !== null) {
        select("#highscore").html(highscore);
    } else {
        highscore = 0;
        select("#highscore").html(highscore);
    }

    noLoop();
    newGame();
}

// One "move"
function keyPressed() {
    let flipped = false;
    let rotated = false;
    let played = true;
    switch (keyCode) {
        case DOWN_ARROW:
            // do nothing
            break;
        case UP_ARROW:
            grid = flipGrid(grid);
            flipped = true;
            break;
        case RIGHT_ARROW:
            grid = transposeGrid(grid);
            rotated = true;
            break;
        case LEFT_ARROW:
            grid = transposeGrid(grid);
            grid = flipGrid(grid);
            rotated = true;
            flipped = true;
            break;
        default:
            played = false;
    }

    if (played) {
        let past = copyGrid(grid);
        for (let i = 0; i < 4; i++) {
            grid[i] = operate(grid[i]);
        }
        let changed = compare(past, grid);
        if (flipped) {
            grid = flipGrid(grid);
        }
        if (rotated) {
            grid = transposeGrid(grid);
        }
        if (changed) {
            addNumber();
        }
        updateCanvas();

        let gameover = isGameOver();
        if (gameover) {
            if (score > highscore) {
                highscore = score;
                storeItem("highscore", highscore);

                select("#highscore").html(highscore);
            }
            document.getElementById("gameover").style.display = "flex";
        }

        let gamewon = isGameWon();
        if (gamewon) {
            console.log("GAME WON");
        }

        if (score > highscore) {
            highscore = score;
            storeItem("highscore", highscore);
            select("#highscore").html(highscore);
        }
    }
}

function updateCanvas() {
    background(color("#91887E"));
    drawGrid();
    select("#score").html(score);
}

function drawGrid() {
    let w = 150;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            //strokeWeight(2);
            let val = grid[i][j];
            let s = val.toString();
            if (grid_new[i][j] === 1) {
                //stroke(200, 200);
                strokeWeight(16);
                grid_new[i][j] = 0;
            } else {
                strokeWeight(0);
                stroke(0);
            }

            if (val != 0) {
                strokeWeight(0);
                stroke(0);
                fill(colorsSizes[s].color);
            } else {
                color;
                fill(color("rgba(238, 228, 218, 0.35)"));
            }
            rect(i * w + 7 + 10, j * w + 7 + 10, w - 14, w - 14, 10);
            if (val !== 0) {
                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                textSize(colorsSizes[s].size);
                text(val, i * w + w / 2 + 10, j * w + w / 2 + 14);
            }
        }
    }
}
