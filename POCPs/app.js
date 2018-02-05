$(document).ready(function(){
    console.log("Working");
    hideImg();
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
  })

var keys = {};

$(document).keydown(function(event){
    keys[event.which] = true; //keys[event.which] adds the key pressed to array keys
    printKeys();
    showImg();
});

$(document).keyup(function(event){
    delete keys[event.which];
    printKeys();
    hideImg();
});

function printKeys() {
    var html = '';
    for (var i in keys) {
        //keys.hasOwnProperty(i) checks if i is a direct property of keys, or it has been inherited from elsewhere.
        //If i is not a direct property of keys, it skips this iteration of the loop
        // if (!keys.hasOwnProperty(i)) continue; //Continue breaks 1 iteration of the loop
        //It works with this commented out. But will keep around incase it turns out to be needed to prevent bug
        html += i + ', ';
    }
    $('#demo').html(html);
}

function hideImg(){
  $("#imgdemo").hide();
}

function showImg(){
  $("#imgdemo").show();
}
