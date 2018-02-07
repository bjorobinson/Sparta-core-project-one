$(document).ready(function(){
    console.log("Working");
    showScore();
    $("#start_btn").click(function(){
      playSong();
      $("#start_btn").hide();
    })

  })

var input = {};
var acceptedKeys = [71,72,74,75,76]; //G,H,J,K,L
var spawnIterator = 0;
var checkIterator = 0;
var globDelay = 0;
var globDelayIt = (60000/(81*2)); //This is the time inbetween each 1/2 beat in the song.
var noteTime = globDelayIt*3; //The time it will take a note to reach the top of the screen to the end zone
var score = 0;

//Music and Time-based functions
function playSong(){
  score = 0; // reset global score to 0 so people can experiment with the buttons before they start.
  new Audio('./music/Queen_We_Will_Rock_You.mp3').play()
  //The Song itself
  waitBeat();
  waitBeat();
  waitBeat();
  spawnRest();
  new Audio('./music/81bpm_4-4time_5count_in.mp3').play()
  waitBar();
  for (var i = 0; i < 27; i++) {
    chorus();
  }
  spawnRest(); //Rest between sections to attempt to manually fix the desync that'll have been caused by this point
  longStrum();
  waitBeat();
  waitBeat();
  waitBeat();
  solo();
  //End of song, displaying result
  endScore();
}

function endScore(){
  waitBeat();

  setTimeout(function(){
    showFinalScore();
    $('#myModal').modal('show');
  },globDelay)
  globDelay += globDelayIt;
}


//wait equivalent time for 4 whole beats
function waitBar(){
  waitBeat();
  waitBeat();
  waitBeat();
  waitBeat();
}

//wait equivalent time for 1 whole beat
function waitBeat(){
  spawnRest();
  spawnRest();
}

//Base function for the 'waiting' - it waits equivalent time for 1/2 a beat
function spawnRest(){
  setTimeout(function(){
  },globDelay)
  globDelay += globDelayIt;
}

//The 'base base snare' bar that's repeated through the start of the song
function chorus(){
  spawnNote("red");
  spawnNote("red");
  spawnNote("green");
  spawnRest();
  spawnNote("red");
  spawnNote("red");
  spawnNote("green");
  spawnRest();
}

//The long between the base base snare and the guitar solo
function longStrum(){
  for (var i = 0; i < 16; i++) {
    spawnNote("yellow");
    spawnNote("yellow");
  }
}

//The final guitar solo
function solo(){
  //soloArray = ["yellow","red"...etc etc]
  var soloArray = ['green','red','green','green','green','red','green','green','green','purple','green','purple','green','blue','green','blue','green','purple','green','purple','green','blue','blue','blue','rest','blue','purple','purple','blue','green','yellow','rest','blue','purple','purple','blue'];
  for (var counter = 0; counter < soloArray.length; counter++) {
    if (soloArray[counter]=='rest') {
      spawnRest();
    } else {
      spawnNote(soloArray[counter]);
      spawnRest();
    }
  }
}

function showFinalScore(){
  $("#score_result").html("Your final score: " + score);
}

function showScore(){
  $("#score").html("Score: " + score);
}

function addScore(){
  score ++;
  showScore();
}

function subtractScore(){
  score --;
  showScore();
}

//function to convert keycodes of valid button pushes into what colours they referred to.
function whatButton(keyCodeIn){
  switch (keyCodeIn) {
    case 71:
      return 'red'
      break;
    case 72:
      return 'yellow'
      break;
    case 74:
      return 'green'
      break;
    case 75:
      return 'blue'
      break;
    case 76:
      return 'purple'
      break;
    default:
  }
}

$(document).keydown(function(event){
  if (jQuery.inArray(event.which,acceptedKeys)!=-1) {
    //Takes the accepted keys array, and returns the index of the first arguement, or -1 if it is not found
    var keycode = event.which
    input[keycode] = true; //creates an object in input with event.which as its key
    addPushed($("#" + whatButton(keycode)));
    hasNote(whatButton(keycode));
  }
});

$(document).keyup(function(event){
  var keycode = event.which
  delete input[keycode];
  removePushed($("#" + whatButton(keycode)));
});

function addPushed(obj){
  obj.addClass("pushed");
}

function removePushed(obj){
  obj.removeClass("pushed");
}

//function to check if the arguement button has a note in it
function hasNote(colour){
  var obj = $("#"+colour);
  var nextNote = $("#"+checkIterator);
  try{
    //-100 is the margin for error. It is intentionally very generous.
    if ((nextNote.offset().top > obj.offset().top-100) && obj.hasClass(colour) && nextNote.hasClass(colour)) {
      nextNote.addClass('hit');
      nextNote.remove();
    } else {
      subtractScore();
    }
  }
  catch(err){
    console.log(err.message);
    subtractScore();
  }
}



function spawnNote(noteColour){
  setTimeout(function(){
    var newNote = document.createElement("div");
    $(newNote).addClass("note");
    $(newNote).addClass(noteColour);
    $(newNote).addClass(noteColour+"Note"); //sets the background colour and where it will spawn on the board
    $(newNote).attr("id",spawnIterator);
    spawnIterator++;
    $(newNote).appendTo('#notefall');
    moveNote($(newNote));
  },globDelay);
  globDelay += globDelayIt;
}

function moveNote(newNote){
  newNote.animate({
    top:'700px'
  },noteTime,"linear", function(){
    //excute when complete
    setPoints(newNote);
    newNote.remove();
    checkIterator += 1;
  });
}

function setPoints(obj){
  if (obj.hasClass('hit')) {
    addScore();
  } else {
    subtractScore();
  }
}
