
var buttonColors=["red","blue","green","yellow"];
var userClickedPatern = [];
var gamePattern = [];
var started = false;
var level = 0;


$(document).keypress(function(){
  if (!started){
  $("#level-title").text("Level "+ level);
  nextSequence();
  started=true;

}
});




$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPatern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPatern.length-1);

});

function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPatern[currentLevel]){
  console.log("success");

  if (userClickedPatern.length === gamePattern.length){
    setTimeout(function (){
      nextSequence();
    }, 1000);

  }
} else{
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
  }
}

function nextSequence(){
  userClickedPatern = [];
  level++;
  $("#level-title").text("Level "+ level);

  var randomNumber=Math.floor((Math.random()*4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("."+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

function playSound(name){
new Audio("sounds/"+name+".mp3").play();
}
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
