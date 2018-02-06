$(document).ready(function(){
    //new Audio('../music/Queen_We_Will_Rock_You.mp3').play()
    new Audio('../music/82bpm_4-4time_metronome.mp3').play()
    console.log("Working");
    showScore();

    //The Song itself
    //This is going to be very fiddly as I try and line up to ensure sync;

    waitBeat();
    waitBeat();
    waitBeat();
    waitBar();
    for (var i = 0; i < 56; i++) {
      chorus();
    }
  })

var input = {};
var acceptedKeys = [71,72,74,75,76]; //G,H,J,K,L
var spawnIterator = 0;
var checkIterator = 0;
var globDelay = 0;
//bpm -> 731.7 ms per beat -> 365.85
var globDelayIt = (60000/164); //This is the time inbetween each 1/2 beat in the song.
var noteTime = globDelayIt*2.5; //The time it will take a note to reach the top of the screen to the end zone
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
    if ((nextNote.offset().top > obj.offset().top-50) && obj.hasClass(colour) && nextNote.hasClass(colour)) {
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
    top:'800px'
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
