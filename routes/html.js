const Workout = require("../models/models.js");

module.exports = function (app) {
  
  app.get("/", (req, res) => {
    Workout.find({})
    .then(dbWorkouts => {
      let hbsObject = {
        workout: dbWorkouts
      };
      res.render("workout_list", hbsObject);
    })
    .catch(err => {
      res.json(err);
    });
  });
}