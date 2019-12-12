const Workout = require("../models/models.js");

module.exports = function (app) {
  app.post("/api/add", (req, res) => {
    const myNewWorkout = req.body;
    Workout.create(myNewWorkout)
      .then(res.send)
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/api/update", (req, res) => {
    console.log(req.body.id)
    const myNewWorkout = req.body;
      Workout.findOneAndReplace({_id: req.body.id}, req.body)
        .then(res.send())
        .catch(err => {
          res.json(err);
        });
  });

  app.get("/api/view/:id", (req, res) => {
    Workout.findOne({ _id: req.params.id }, function (err, myWorkout) {
      if (err) return handleError(err);
      res.send(myWorkout)
    });
  });

  app.delete("/api/delete", (req, res) => {
    Workout.deleteOne({ _id: req.body.id }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
      res.send();
    });
  });
}