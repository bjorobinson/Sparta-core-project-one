$(document).ready(function(){
    console.log("Working");
    // moveNote();

    //interval is typically sent to the number of beats per second.
    //HOWEVER. This would only allow for full notes. Songs require at least 1/2 notes, so it is 1/2 this interval further.
    //We Will Rock You: 731.7 milliseconds per beat
     // var timer = setInterval(timerLoop,365.85);
     // function timerLoop(){
     //   $("#linespawner").spawnLine();
     // }

     spawnNote("redNote");
  })

var input = {};
var acceptedKeys = [71,72,74,75,76]; //G,H,J,K,L
var playerInput = 'rygbp';//Declaring the 'default' input as no keys pushed
var lastInput = "rygbp";

$(document).keydown(function(event){
  if (jQuery.inArray(event.which,acceptedKeys)!=-1) {
    //Takes the accepted keys array, and returns the index of the first arguement, or -1 if it is not found
    input[event.which] = true; //creates an object in input with event.which as its key
    whatIsPushed(input);
  }
});

$(document).keyup(function(event){
  delete input[event.which];
  whatIsPushed(input);
});

 function printKeys(text) {
   $('#demo').html("<p>" + text + "</p>");
}

function addPushed(obj){
  obj.addClass("pushed");
}

function removePushed(obj){
  obj.removeClass("pushed");
}

//function to determine what keys are pushed, and then add pushed class to the right keys
function whatIsPushed(keys){
  playerInput='';
  if (71 in keys){
    addPushed($("#red"));
    if (lastInput[0]!='r') {
      playerInput += '>';
    } else{
      playerInput += 'R';
    }
  } else {
    removePushed($("#red"));
    playerInput += 'r';
  }
  if (72 in keys){
    addPushed($("#yellow"));
    if (lastInput[1]!='y') {
      playerInput += '>';
    } else{
      playerInput += 'Y';
    }
  } else {
    removePushed($("#yellow"));
    playerInput += 'y';
  }
  if (74 in keys){
    addPushed($("#green"));
    if (lastInput[2]!='g') {
      playerInput += '>';
    } else{
      playerInput += 'G';
    }
  } else {
    removePushed($("#green"));
    playerInput += 'g';
  }
  if (75 in keys){
    addPushed($("#blue"));
    if (lastInput[3]!='b') {
      playerInput += '>';
    } else{
      playerInput += 'B';
    }
  } else {
    removePushed($("#blue"));
    playerInput += 'b';
  }
  if (76 in keys){
    addPushed($("#purple"));
    if (lastInput[4]!='p') {
      playerInput += '>';
    } else{
      playerInput += 'P';
    }
  } else {
    removePushed($("#purple"));
    playerInput += 'p';
  }
  //printKeys(playerInput);
  lastInput = playerInput;
  return playerInput;
}

// function moveNote(){
//   var pos = 0;
//   var incrament = 4;
//   var zoneLowerlimit = 700;
//   var zoneUpperlimit = 800;
//   var interval = setInterval(frame,10);
//
//   function frame(){
//     if (pos < 0){
//       clearInterval(interval);
//     } else {
//       pos += incrament;
//       $('#demomove').css('margin-left', pos+ 'px');
//       if (pos > zoneLowerlimit && pos < zoneUpperlimit && playerInput[0]=='R') {
//         $('#demomove').remove();
//       } else if (pos > zoneUpperlimit) {
//         $('#demomove').remove();
//       }
//     }
//   }
//
//   console.log("animating");
// }

function spawnNote(noteClass){
  var newNote = document.createElement("div");
  $(newNote).addClass("note");
  $(newNote).addClass(noteClass); //sets the background colour and where it will spawn on the board
  $(newNote).attr("id",Math.random()); //Generates random number ID
  $(newNote).appendTo('#notefall');
  console.log('note spawned');
  moveNote($(newNote));
}

function moveNote(newNote){
  // var pos = 0;
  // var incrament = 1;
  // var zoneLowerlimit = 700;
  // var zoneUpperlimit = 800;
  // var interval = setInterval(frame,10);
  // function frame(){
  //   if (pos < 0){
  //     clearInterval(interval);
  //   } else {
  //     pos += incrament;
  //     newNote.css('padding-top', pos+ 'px');
  //     if (pos > zoneLowerlimit && pos < zoneUpperlimit && playerInput[0]=='R') {
  //       newNote.remove();
  //     } else if (pos > zoneUpperlimit) {
  //       newNote.remove();
  //     }
  //   }
  //}
  newNote.animate({
    top:'200px'
  },4000,"linear", function(){
    //excute when complete
    console.log("complete");
  });
  console.log("animating note");
}
