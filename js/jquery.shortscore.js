jQuery(function($) {
   window.shortscore = {};
   shortscore.locked = false;

  $(window).scroll(function() {
    if ($("#shortscore_value").scisOnScreen()) {
      if (shortscore.locked === false) {
        animateShortcore();
      }
    }
  });

  var animateShortcore = function() {
    shortscore.locked = true;
    var current_rating = false;

    $.each($("#shortscore_value").attr("class").split(/\s+/), function(i, name) {
      if (name.includes("shortscore-") === true) {
        current_rating = name.replace("shortscore-", "");
      }
    });

    var arr = [];
    var i;

    for (i = 1; i <= current_rating; i++) {
      arr.push(i);
    }

    $("#shortscore_value").removeClass("shortscore-0 shortscore-1 shortscore-2 shortscore-3 shortscore-4 shortscore-5 shortscore-6 shortscore-7 shortscore-8 shortscore-9 shortscore-10");

    $.each(arr, function(index, value) {
      var predecessor = value - 1;
      $("#shortscore_value").delay(400).queue(function() {
        $("#shortscore_value").removeClass("shortscore-" + predecessor).addClass("shortscore-" + value).dequeue();
        // if (value === arr.length) {
        //  shortscore.locked = false;
        // }
      });
    });
  };

  $.fn.scisOnScreen = function() {

    var win = $(window);

    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  };

});