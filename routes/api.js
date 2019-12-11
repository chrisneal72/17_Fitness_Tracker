const Workout = require("../models/models.js");

module.exports = function (app) {
  app.post("/api/add", (req, res) => {
    // console.log(req.body)
    Workout.create(req.body)
    .then(dbWorkout => {
      //do work on dbWorkout
      console.log(dbWorkout)
        var hbsObject = {
          burger: "test",
          devoured: true
        };
        res.render("workout-list", hbsObject);

      })
      .catch(err => {
        res.json(err);
      });
  });

}