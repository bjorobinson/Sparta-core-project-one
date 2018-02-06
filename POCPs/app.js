$(document).ready(function(){
    console.log("Working");
    showScore();
    // moveNote();

    //interval is typically sent to the number of beats per second.
    //HOWEVER. This would only allow for full notes. Songs require at least 1/2 notes, so it is 1/2 this interval further.
    //We Will Rock You: 731.7 milliseconds per beat
     // var timer = setInterval(timerLoop,365.85);
     // function timerLoop(){
     //   $("#linespawner").spawnLine();
     // }

     //Count in 1, 2, 3, 4
     spawnRest();
     spawnRest();
     spawnRest();
     spawnRest();
     //The "base base snare" for 1 bar of we will rock you
     spawnNote("red");
     spawnNote("red");
     spawnNote("green");
     spawnRest();
     spawnNote("red");
     spawnNote("red");
     spawnNote("green");
     spawnRest();
  })

var input = {};
var acceptedKeys = [71,72,74,75,76]; //G,H,J,K,L
// var playerInput = 'rygbp';//Declaring the 'default' input as no keys pushed
// var lastInput = "rygbp";
var spawnIterator = 0;
var checkIterator = 0;
var globDelay = 0;
var score = 0;

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
    // whatIsPushed(input);
    // hasNote($("#" + whatButton(keycode)));
    hasNote(whatButton(keycode));
  }
});

$(document).keyup(function(event){
  var keycode = event.which
  delete input[keycode];
  removePushed($("#" + whatButton(keycode)));
  // whatIsPushed(input);
});

function addPushed(obj){
  obj.addClass("pushed");
}

function removePushed(obj){
  obj.removeClass("pushed");
}

//function to check if the arguement button has a note in it
function hasNote(colour){
  //by default, our arg is red
  //check if boundaries contain an object of type 'rednote'
  //console.log(colour);
  var obj = $("#"+colour);
  //console.log(obj);
  var nextNote = $("#"+checkIterator);
  //console.log(nextNote);
  // console.log(nextNote.offset().top);
  //console.log($("#" + whatButton(obj)));
  try{
    if ((nextNote.offset().top > obj.offset().top-20) && obj.hasClass(colour) && nextNote.hasClass(colour)) {
      //console.log("hit!");
      addScore();
      nextNote.remove();
      // checkIterator += 1;
    } else {
      subtractScore();
      //console.log("miss!");
    }
  }
  catch(err){
    console.log(err.message);
    subtractScore();
  }
  // if ((nextNote.offset().top > obj.offset().top-20) && obj.hasClass(colour) && nextNote.hasClass(colour)) {
  //   //console.log("hit!");
  //   addScore();
  //   nextNote.remove();
  //   // checkIterator += 1;
  // } else {
  //   subtractScore();
  //   //console.log("miss!");
  // }
  //if so, delete said rednote and console log it

}

//function to determine what keys are pushed, and then add pushed class to the right keys
// function whatIsPushed(keys){
//   playerInput='';
//   if (71 in keys){
//     addPushed($("#red"));
//     if (lastInput[0]!='r') {
//       playerInput += '>';
//     } else{
//       playerInput += 'R';
//     }
//   } else {
//     removePushed($("#red"));
//     playerInput += 'r';
//   }
//   if (72 in keys){
//     addPushed($("#yellow"));
//     if (lastInput[1]!='y') {
//       playerInput += '>';
//     } else{
//       playerInput += 'Y';
//     }
//   } else {
//     removePushed($("#yellow"));
//     playerInput += 'y';
//   }
//   if (74 in keys){
//     addPushed($("#green"));
//     if (lastInput[2]!='g') {
//       playerInput += '>';
//     } else{
//       playerInput += 'G';
//     }
//   } else {
//     removePushed($("#green"));
//     playerInput += 'g';
//   }
//   if (75 in keys){
//     addPushed($("#blue"));
//     if (lastInput[3]!='b') {
//       playerInput += '>';
//     } else{
//       playerInput += 'B';
//     }
//   } else {
//     removePushed($("#blue"));
//     playerInput += 'b';
//   }
//   if (76 in keys){
//     addPushed($("#purple"));
//     if (lastInput[4]!='p') {
//       playerInput += '>';
//     } else{
//       playerInput += 'P';
//     }
//   } else {
//     removePushed($("#purple"));
//     playerInput += 'p';
//   }
//   //printKeys(playerInput);
//   lastInput = playerInput;
//   return playerInput;
// }

function spawnNote(noteColour){
  setTimeout(function(){
    var newNote = document.createElement("div");
    $(newNote).addClass("note");
    $(newNote).addClass(noteColour);
    $(newNote).addClass(noteColour+"Note"); //sets the background colour and where it will spawn on the board
    // $(newNote).attr("id",Math.random()); //Generates random number ID
    $(newNote).attr("id",spawnIterator);
    spawnIterator++;
    $(newNote).appendTo('#notefall');
    //console.log('note spawned');
    //console.log($(newNote));
    moveNote($(newNote));
  },globDelay);
  globDelay += 500;
}

function spawnRest(){
  setTimeout(function(){
    console.log("rest");
  },globDelay)
  globDelay += 500;
}

function moveNote(newNote){
  newNote.animate({
    top:'400px'
  },1000,"linear", function(){
    //excute when complete
    newNote.remove();
    checkIterator += 1;
  });
  //console.log("animating note");
  //console.log(newNote.offset());
}
