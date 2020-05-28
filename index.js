var colors = ["green", "red", "yellow", "blue"];
var randomColor = Math.floor(Math.random() * 4);
var patternColorSelected = [];
var gamePattern = [];
var gameStart = true;
var numOfLevel = 0;

$(document).keydown(function() {
  if (gameStart) {
    nextLevel();
    gameStart = false;
  }
});

$(".btn").on("click", function() {
  var colorSelected = $(this).attr("id");
  patternColorSelected.push(colorSelected);
  animatedSquares(colorSelected);
  playSound(colorSelected);
  verifyAnswer(patternColorSelected.length - 1);
});

function verifyAnswer(level) {
  if(gamePattern[level] === patternColorSelected[level]) {
    if(gamePattern.length === patternColorSelected.length) {
      setTimeout(function() {
        nextLevel();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text("Game over, Press any key to restart!");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    reset();
  }
}

function nextLevel() {
  patternColorSelected = [];
  numOfLevel++;
  $("h1").text("Level " + (numOfLevel));
  randomColor = Math.floor(Math.random() * 4);
  gamePattern.push(colors[randomColor]);
  animatedSquares(colors[randomColor]);
  playSound(colors[randomColor]);
}

function animatedSquares(colorSelected) {
  $("." + colorSelected).fadeOut(100).fadeIn(100);
}

function playSound(colorSelected) {
  audio = new Audio("sounds/" + colorSelected + ".mp3");
  audio.play();
}

function reset() {
  gamePattern = [];
  gameStart = true;
  numOfLevel = 0;
}
