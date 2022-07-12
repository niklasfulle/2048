var game;
var score = 0;

function init() {
  game = new Array(4);
  for (var i = 0; i < 4; i++) {
    game[i] = new Array(4);
  }

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      game[i][j] = "";
    }
  }

  game[0][0] = 2;
  game[3][3] = 2;

  view();
}

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowUp") {
    upShift();
  } else if (e.code === "ArrowRight") {
    rightShift();
  } else if (e.code === "ArrowDown") {
    downShift();
  } else if (e.code === "ArrowLeft") {
    leftShift();
  }
  view();
});

function upShift() {}

function rightShift() {
  for (var i = 0; i < 4; i++) {}
}

function downShift() {}

function leftShift() {
  for (var i = 0; i < 4; i++) {
    if (game[i][0] == "") {
      game[i][0] = game[i][1];
      game[i][1] = "";
    }
    if (game[i][1] == "") {
      game[i][1] = game[i][2];
      game[i][2] = "";
    }
    if (game[i][2] == "") {
      game[i][2] = game[i][3];
      game[i][3] = "";
    }
  }
}

function view() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (game[i][j] != undefined) {
        var div = document.createElement("div");
        div.innerHTML = game[i][j];
        switch (game[i][j]) {
          case 2:
            div.setAttribute("class", "piece piece2");
            break;
          case 4:
            div.setAttribute("class", "piece piece4");
            break;
          case 8:
            div.setAttribute("class", "piece piece8");
            break;
          case 16:
            div.setAttribute("class", "piece piece16");
            break;
        }
        var id = "cell" + i + "" + j;
        document.getElementById(id).innerHTML = "";
        document.getElementById(id).append(div);
      }
    }
  }
}
