var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

// Detect when any of the key are pressed;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  }

});

// Detect when any of the buttons are clicked and make Activity;
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();

    }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level: " + level);
  // Generation random number; 0 - 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Pick random number => color;
  var randomChosenColour = buttonColours[randomNumber];
  // Push chosen number to empty array;
  gamePattern.push(randomChosenColour);

  // Select the button with same id as randomChosenColour;
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}


function playSound(name) {
    // Play sound;
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
