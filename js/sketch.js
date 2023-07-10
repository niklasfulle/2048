let grid;

function setup() {
    createCanvas(400, 400);
    grid = blankGrid();
    addNumber();
    addNumber();
}

function draw() {
    background(220);
    drawGrid();
}

function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
}

function copyGrid(grid) {
    let extra = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            extra[i][j] = grid[i][j];
        }
    }
    return extra;
}

function flipGrid(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }
    return grid;
}

function rotateGrid(grid) {
    let newGrid = blankGrid();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i];
        }
    }
    return newGrid;
}

function compare(a, b) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (a[i][j] !== b[i][j]) {
                return true;
            }
        }
    }
    return false;
}

function keyPressed() {
    let flipped = false;
    let rotated = false;
    let played = true;
    console.log(keyCode);
    switch (keyCode) {
        case DOWN_ARROW:
            console.log("down");
            break;
        case UP_ARROW:
            console.log("up");

            grid = flipGrid(grid);
            flipped = true;

            break;
        case RIGHT_ARROW:
            console.log("right");

            grid = rotateGrid(grid);
            rotated = true;

            break;
        case LEFT_ARROW:
            console.log("left");

            grid = rotateGrid(grid);
            grid = flipGrid(grid);
            rotated = true;
            flipped = true;

            break;

        default:
            played = false;
            break;
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
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
        }

        if (changed) {
            addNumber();
        }
    }
}

function operate(row) {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
}

function addNumber() {
    let options = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                options.push({
                    x: i,
                    y: j,
                });
            }
        }
    }

    if (options.length > 0) {
        let spot = random(options);
        let r = random(1);
        grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
    }
}

function slide(row) {
    let arr = row.filter((val) => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

function combine(row) {
    for (let i = 3; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];
        if (a == b) {
            row[i] = a + b;
            row[i - 1] = 0;
        }
    }
    return row;
}

function drawGrid() {
    let w = 100;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            rect(i * w, j * w, w, w);
            if (grid[i][j] !== 0) {
                textAlign(CENTER, CENTER);
                textSize(64);
                text(grid[i][j], i * w + w / 2, j * w + w / 2);
            }
        }
    }
}
