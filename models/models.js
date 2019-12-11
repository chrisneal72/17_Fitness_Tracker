const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  workout_name: {
    type: String,
    trim: true,
    required: "Workout is Required"
  },

  exercises: [
    {
      ex_name: {
        type: String,
        trim: true,
        required: "An exercise name is Required",
      }
    },
    {
      ex_sets: {
        type: String,
        trim: true,
        required: "Sets is Required",
      }
    },
    {
      ex_reps: {
        type: String,
        trim: true,
        required: "Reps is Required",
      }
    }
  ]

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;