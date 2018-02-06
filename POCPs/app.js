$(document).ready(function(){
    //new Audio('../music/Queen_We_Will_Rock_You.mp3').play()
    console.log("Working");
    showScore();

    //The Song itself
    //This is going to be very fiddly as I try and line up to ensure sync;
    //Pause before song actually start
    waitBar();
    waitBar();
    //The "base base snare" for 1 bar of we will rock you
    chorus();
    chorus();
    chorus();
    chorus();
  })

var input = {};
var acceptedKeys = [71,72,74,75,76]; //G,H,J,K,L
// var playerInput = 'rygbp';//Declaring the 'default' input as no keys pushed
// var lastInput = "rygbp";
var spawnIterator = 0;
var checkIterator = 0;
var globDelay = 0;
var globDelayIt = 360; //This is the time inbetween each 1/2 beat in the song.
var noteTime = 1050; //The time it will take a note to reach the top of the screen to the end zone
var score = 0;

//Music and Time-based functions

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
    // console.log("rest");
  },globDelay)
  globDelay += globDelayIt;
}

//The function that spawns the 'base base snare' bar that's repeated through the song
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

function showScore(){
  $("#score").html(score);
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
    if ((nextNote.offset().top > obj.offset().top-40) && obj.hasClass(colour) && nextNote.hasClass(colour)) {
      addScore();
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
    top:'400px'
  },noteTime,"linear", function(){
    //excute when complete
    newNote.remove();
    checkIterator += 1;
  });
}
