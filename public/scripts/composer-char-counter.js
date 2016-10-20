$('document').ready(function() {
  const initColor = $('.counter').css("color");
  $('textarea').on('keyup', function() {
    //console.log($(this)['context'].selectionEnd);
    //console.log($(this));
    var count = $(this).val().length;
    //console.log(count);
    var counter = $(this).parent().children('.counter');
    counter[0].innerHTML = 140 - count;
    if (counter[0].innerHTML < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", initColor);
    }
  });
});

