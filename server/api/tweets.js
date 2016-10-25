"use strict";

const User    = require("../lib/user-helper");
const express = require('express');
const tweets  = express.Router();
const db      = require("../lib/db");

// Export to be used on app.js
module.exports = function() {

  // Error handling
  function sendError(res, message)
  {
    res.status(400);
    res.send(JSON.stringify({ message }));
  }

  // Load the tweets from the database
  tweets.get("/", function(req, res) {
    let tweets = db.all((err, allTweets) => {         // calls lib/db.js
      res.send(allTweets);
    });
  });

  // Post error message or a new tweet to the page and database.
  tweets.post("/", function(req, res) {
    if (!req.body.text) {
      return sendError(res, 'Tweet cannot be empty');
    } else if (req.body.text.length > 140) {
      return sendError(res, 'Tweet cannot be longer than 140 characters');
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    db.create(tweet, (err, allTweets) => {          // calls lib/db.js
      return res.send(tweet);
    });
  });

  return tweets;

};
