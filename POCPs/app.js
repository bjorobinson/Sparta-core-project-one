$(document).ready(function(){
    console.log("Working");
    // hideImg();
    //onkeypress
    // $('#demo').keypress(function(event){
    //   console.log('keypress working');
    //   console.log(event.which);
    //   //This returns a number corresponding to what was pressed. Each key has an assigned number, though this must be checked on other machines soon.
    // })

    //onkeydown
    // $('#demo').keydown(function(event){
    //   console.log('keydown working');
    //   console.log(event.which);
    // })
    //Seems to function in an identical way to keypress, including multiple calls when the button is held down. Concluding that I use either this function or keypress, not both.

    //onkeyup
    // $('#demo').keyup(function(event){
    //   console.log('keyup working');
    //   console.log(event.which);
    // })
    //Is only called when key is lifted up. Will be useful in differentiating difference between hit and hold notes.
    moveNote();
  })

var input = {};
var acceptedKeys = [71,72,74,75,76]; //G,H,J,K,L

$(document).keydown(function(event){
  if (jQuery.inArray(event.which,acceptedKeys)!=-1) {
    //console.log(event.which);
    //Takes the accepted keys array, and returns the index of the first arguement, or -1 if it is not found
    input[event.which] = true; //creates an object in input with event.which as its key
    //console.log(input);
    // printKeys();
    // showImg();
    //addPushed($("#red"));
    whatIsPushed(input);
  }
});

$(document).keyup(function(event){
  delete input[event.which];
  // printKeys();
  // hideImg();
  //removePushed($("#red"));
  whatIsPushed(input);
});

 function printKeys(text) {
   $('#demo').html("<p>" + text + "</p>");
}

// function hideImg(){
//   $("#imgdemo").hide();
// }
//
// function showImg(){
//   $("#imgdemo").show();
// }

function addPushed(obj){
  obj.addClass("pushed");
}

function removePushed(obj){
  obj.removeClass("pushed");
}

//function to determine what keys are pushed, and then add pushed class to the right keys
function whatIsPushed(keys){
  playerInput='';
  // console.log(keys);
  // console.log(jQuery.inArray(71,keys));
  // console.log(jQuery.inArray(71,keys)!=-1);
  //if (jQuery.inArray(71,keys) != -1) {
  //if (keys.hasOwnProperty(71)) {
  if (71 in keys){
    //console.log("add red");
    addPushed($("#red"));
    playerInput += 'R';
  } else {
    removePushed($("#red"));
    //console.log("remove red");
    playerInput += 'r';
  }
  if (72 in keys){
    addPushed($("#yellow"));
    playerInput += 'Y';
  } else {
    removePushed($("#yellow"));
    playerInput += 'y';
  }
  if (74 in keys){
    addPushed($("#green"));
    playerInput += 'G';
  } else {
    removePushed($("#green"));
    playerInput += 'g';
  }
  if (75 in keys){
    addPushed($("#blue"));
    playerInput += 'B';
  } else {
    removePushed($("#blue"));
    playerInput += 'b';
  }
  if (76 in keys){
    addPushed($("#purple"));
    playerInput += 'P';
  } else {
    removePushed($("#purple"));
    playerInput += 'p';
  }

  printKeys(playerInput);
}

function moveNote(){
  // $("#demomove").animate({
  //   left:"+=1000px"
  // },10000)

  var pos = 1;
    var interval = setInterval(frame,10);

    function frame(){
      if (pos < 0){
        clearInterval(interval);
      } else {
        pos += 1;
        $('#demomove').css('margin-left', pos+ 'px');
      }
    }

  console.log("animating");
}
