const buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
var userChosenPattern = [];
let level = 0;
let started = false;


$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userChosenPattern = [];
    level++;
    $("#level-title").text("level " + level);

    const randomNum = Math.floor(Math.random()* 4);
    const randomChosenColor = buttonColor[randomNum];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
};


$(".btn").click(function() {
    var userChosenColor = $( this ).attr("id");
    userChosenPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (userChosenPattern[currentLevel] === gamePattern[currentLevel]) {
            if (userChosenPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        };
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over, PRESS ANY KEY TO RESTART!");
        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}