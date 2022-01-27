var game_time = 20;
var score = 0;
var spawnInterval = 450;

$(".fa-play-circle").click(function() {
  $(".fa-play-circle").toggleClass("hidden");
  GameLoop();
});
$(".fa-undo").click(function() {
  $(".endText").toggleClass("hidden");
  $(".fa-undo").toggleClass("hidden");
  game_time = 20;
  score = 0;
  spawnInterval = difficultyCalculator();
  GameLoop();
});

function GameLoop() {
  $(".timer").toggleClass("hidden");
  $(".timer").text(game_time)
  spawnCircleAndListen();
  var timer = setInterval(() => {
    $(".timer").text(--game_time)
    if (game_time == 0) {
      window.clearInterval(loop)
      window.clearInterval(timer)
      endScreen()
    };
  }, 1000)
  var loop = setInterval(() => {
    spawnCircleAndListen();
  }, spawnInterval);
};


function spawnCircleAndListen() {
  var leftLim = GenerateRandomInt(0, $(".container").innerWidth() - 100);
  var topLim = GenerateRandomInt(0, $(".container").innerHeight() - 100);
  $(".container").append('<img class="target" src="images/target.jpg" alt="target" style="top:' + topLim + 'px;left:' + leftLim + 'px">');
  $(".target").last().click(function() {
    score = score + 1;
    this.remove();
  })
}

function GenerateRandomInt(min, max) {
  var rand = Math.floor(Math.random() * (max - min) + min);
  return rand;
}

function endScreen() {
  $(".target").remove();
  $(".endText").text("time's up!, your score is " + score + " the difficulty has been ajusted")
  $(".timer").toggleClass("hidden");
  $(".endText").toggleClass("hidden");
  $(".fa-undo").toggleClass("hidden");

}

function difficultyCalculator(){
  console.log(game_time*1000, spawnInterval, score)
  if (game_time*1000/spawnInterval*0.6 >= score) {
    return(spawnInterval-30);
  } else {return (spawnInterval + 50)

  }
}
