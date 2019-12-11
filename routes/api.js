const Workout = require("../models/models.js");

module.exports = function (app) {
  app.post("/api/add", (req, res) => {
    console.log(req.body)
    const myNewWorkout = {
      workout_name: req.body.workout_name,
      exercises: [
        {
          ex_name: req.body.ex_name,
          ex_sets: req.body.ex_sets,
          ex_reps: req.body.ex_reps
        }
      ]
    };
    Workout.create(myNewWorkout)
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