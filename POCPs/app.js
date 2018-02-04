$(document).ready(function(){
    console.log("Working");

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
    $('#demo').keyup(function(event){
      console.log('keyup working');
      console.log(event.which);
    })
    //Is only called when key is lifted up. Will be useful in differentiating difference between hit and hold notes.
  })
