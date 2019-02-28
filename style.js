// Arrays with all the colours.
var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

// Trigger on click;
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
});

var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

}); 


// Function with generation random code.
function nextSequence() {

    level++;

    // Generate random number 1-3;
    var randomNumber = Math.round(Math.random() * 3);
   
    // Pick the random colour (red, blue, green, yellow);
    var randomChosenColour = buttonColours[randomNumber];
    
    // Push one of the colour to gamePattern array;
    gamePattern.push(randomChosenColour);

    // Find and design object via jQUERY
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name) {
    // Play sounds;
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}