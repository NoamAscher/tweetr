$('document').ready(function() {
  const initColor = $('.counter').css("color");
  $('textarea').on('keyup', function() {
    var count = $(this).val().length;
    var counter = $(this).parent().children('.counter');
    counter.text(140 - count);
    if (count > 140) {
      counter.css("color", "red");
    } else {
      counter.css("color", initColor);
    }
  });
});

