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


// the data to be rendered
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        //"small": "<script>alert('uh oh!');</script>",
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
      //"handle": "<script>alert('uh oh!');</script>"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    //},
    },
    "created_at": 1461113796368
  }
];

// jQuery to be added
$(function() {    //$('document').ready() shortcut

  // helper function to calculate days ago. Just calculates milliseconds and rounds down.
  var daysAgoCalc = function(timestamp) {
    let unixFormat = Date.now() - timestamp;
    let dayNum = Math.floor(unixFormat / (24*60*60*1000));
    return `${dayNum} days ago`;
  };

  // renders an individual tweet
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

  // renders all the tweets in the data by calling createTweetElement on each
  var renderTweets = function(tweets) {
    tweets.forEach(function(tweet) {
      $('#tweet-container').append(createTweetElement(tweet));
    });
  };

  // renders the data
  renderTweets(data);

});

