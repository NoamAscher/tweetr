/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Dynamic Tweets Assignment


// Escape character function to prevent XSS:
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Helper function to calculate days ago. Just calculates milliseconds and rounds down.
var daysAgoCalc = function(timestamp) {
  let unixFormat = Date.now() - timestamp;
  let dayNum = Math.floor(unixFormat / (24*60*60*1000));
  return `${dayNum} days ago`;
};

// Renders an individual tweet
var createTweetElement = function(tweetObject) {
  var tweet = $("<article>").addClass("full-tweet");

  var header = $("<header>");
  var image = $("<img>").attr("src", tweetObject.user.avatars.small);
  var name = $("<span>").addClass("name").html(`${escape(tweetObject.user.name)}`);
  var handle = $("<span>").addClass("handle").html(`${escape(tweetObject.user.handle)}`);

  header.append(image).append(name).append(handle);

  var content = $("<span>").addClass("tweet-content").html(`${escape(tweetObject.content.text)}`);

  var footer = $("<footer>");
  var daysAgo = $("<span>").addClass("days-ago").html(daysAgoCalc(tweetObject.created_at));

  var iconSet = $("<span>").addClass("icon-set");
  var heart = $("<img>").addClass("icon").attr("src", "/images/heart_sm.png");
  var share = $("<img>").addClass("icon").attr("src", "/images/share_sm.png");
  var flag = $("<img>").addClass("icon").attr("src", "/images/flag_sm.png");

  iconSet.append(heart).append(share).append(flag);

  footer.append(daysAgo).append(iconSet);

  tweet.append(header).append(content).append(footer);

  return tweet;
};

// Renders all the tweets in the data by calling createTweetElement on each
var renderTweets = function(tweets) {
  var dom = tweets.reverse().map(createTweetElement);
  $('#tweet-container').empty().append(dom);
};

// Loads and then renders the tweets
var loadTweets = function() {
  $.get('/tweets').then(renderTweets);
};


// Main jQuery function - $('document').ready() shortcut
$(function() {

  // Error handling
  $(document).ajaxError(function(e, req, xhr) {
    var error;
    try
    {
      error = JSON.parse(req.responseText);
    }
    catch(e)
    {
      error = e
    }

    $('.counter').empty().html(error.message);
    $('.counter').css("color", "red");
  });

  // Form submit ajax: prevents submit, serializes data, creates a tweet
  $('.new-tweet').find('form').on('submit', function(event) {
    event.preventDefault();

    var $textarea = $('textarea', this); //equivalent to $(this).find('textarea');
    $.post('/tweets', $(this).serialize()).then(function(newTweet)
    {
      $textarea.val('');
      loadTweets();
    });
  });

  // Load the tweets here:
  loadTweets();

  // Compose button functionality
  $('#nav-bar').find('.compose').on('click', function(event) {
    if ($('.new-tweet').is(':hidden') ) {
      $('.new-tweet').slideDown();
      $('.new-tweet').find('textarea').focus();
    } else {
      $('.new-tweet').slideUp();
    }
  });

});

