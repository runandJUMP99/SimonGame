var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gameStart = false;
var level = 0;
var randomChosenColor;
var userClickedPattern = [];

$(document).on("keydown", function() {
    if (!gameStart) {
        nextSequence();
        gameStart = true;
    }
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length);
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel -1] == userClickedPattern[currentLevel - 1]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        gameStart = false;
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
    }
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);   
    playSound(randomChosenColor);
    $("#level-title").html("Level " + level);
    userClickedPattern = [];
    level++;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}