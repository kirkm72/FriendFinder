let friends = require("../data/friends"); //Possible matches JSON

module.exports = function(app) {
 app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };
    var userData = req.body; //parse user entries & compare to database
    var userScores = userData.scores;
    var totalDifference;

    for (var i = 0; i < friends.length; i++) { // loop through JSON array
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // We then loop through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    friends.push(userData); //push to database
    res.json(bestMatch); //return best match JSON
  });
};
