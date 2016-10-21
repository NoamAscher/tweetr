"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  function sendError(res, message)
  {
    res.status(400);
    res.send(JSON.stringify({ message }));
  }

  tweets.get("/", function(req, res) {
    let tweets = db.getTweets();
    // simulate delay
    setTimeout(() => {
      return res.json(tweets);
    }, 300);
  });

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
    db.saveTweet(tweet);
    return res.send(tweet);
  });

  return tweets;

}
