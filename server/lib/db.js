"use strict";


const mongodb     = require("mongodb");
const MongoClient = mongodb.MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";


const Tweets = {};
module.exports = Tweets;


MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    return console.error(err.stack);
  }

  const tweetsCollection = db.collection('tweets');

  // Find, sort, return all objects in tweets collection
  Tweets.all = function all (cb) {
    return tweetsCollection.find({}).sort({id:-1}).toArray(cb);
  };

  // Create new tweets
  Tweets.create = function create (tweet, cb) {
    return tweetsCollection.insert(tweet, cb);
  };

  // db closing function
  const closeConnection = function () {
    console.log("\nClosing db connection.");
    try {
      db.close();
    }
    catch (e) {
      console.error("Error while shutting down:", e.stack);
    }
    console.log("Bye!");
    process.exit();
  };

  // Signal handlers make sure to call closeConnection before
  // exiting

  // INT signal, e.g. Ctrl-C
  process.on('SIGINT', closeConnection);
  // TERM signal, e.g. kill
  process.on('SIGTERM', closeConnection);

});