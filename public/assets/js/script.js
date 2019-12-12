$(function () {

  $("#new-workout").on("click", function (event) {
    $("#indv-workout").removeClass("new-workout-hide");
    $("#exercise-list").empty();
    myNewWorkout.exercises = [];
    myNewWorkout.workout_name = '';
    myNewWorkout.id = '';
    $("#ex-name").val('');
    $("#ex-sets").val('');
    $("#ex-reps").val('');
    $("#workout_name").val('');
    $("#workout_form").attr('data-id', '');
  });

  const myNewWorkout = {
    id: $("#workout_form").attr('data-id'),
    workout_name: $("#workout_name").val().trim(),
    exercises: []
  };

  $("#workout_form").on("submit", function (event) {
    event.preventDefault();
    if ($("#ex-name").val() === '' || $("#ex-sets").val() === "" || $("#ex-reps").val() === ""){ return false;};
    $("#save-workout").removeClass("new-workout-hide");
    const workout = {
      ex_name: $("#ex-name").val().trim(),
      ex_sets: $("#ex-sets").val().trim(),
      ex_reps: $("#ex-reps").val().trim()
    }

    myNewWorkout.exercises.push(workout);
    myNewWorkout.workout_name = $("#workout_name").val().trim();
    myNewWorkout.id = $("#workout_form").attr('data-id')

    renderWorkouts();

  });

  $("#save-workout").on("click", function (e) {
    e.preventDefault();
    if ($("#workout_form").attr('data-id')) {
      $.ajax("/api/update", {
        type: "PUT",
        data: myNewWorkout
      }).then(
        function (res) {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    } else {
      $.ajax("/api/add", {
        type: "POST",
        data: myNewWorkout
      }).then(
        function (res) {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }
  });

  $(".view-button").on("click", function (e) {
    e.preventDefault();
    myNewWorkout.exercises = [];
    myNewWorkout.workout_name = '';
    myNewWorkout.id = '';

    $.ajax("/api/view/" + this.id, {
      type: "GET"
    }).then(
      function (res) {
        $("#workout_form").attr('data-id', res._id);
        $("#indv-workout").removeClass("new-workout-hide");
        $("#workout_name").val(res.workout_name);
        for (i = 0; i < res.exercises.length; i++) {
          myNewWorkout.exercises.push(res.exercises[i]);
        }
        renderWorkouts()
      }
    );
  });

  $(".delete-button").on("click", function (e) {
    e.preventDefault();
    $.ajax("/api/delete", {
      type: "DELETE",
      data: {
        id: this.id
      }
    }).then(
      function (res) {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  function renderWorkouts() {
    let exerciseList = $("#exercise-list");
    exerciseList.empty();

    myNewWorkout.exercises.forEach(exercise => {
      var newExercise = $(
        `<div class="col exercise-col"">
          <span id="forecast-date-1"><h3>Exercise name: </h3> ${exercise.ex_name}</span><br>
          <span id="forecast-date-1"><h3>Number of sets: </h3> ${exercise.ex_sets}</span><br>
          <span id="forecast-date-1"><h3>Number of reps: </h3> ${exercise.ex_reps}</span><br>
          </div>`
      );
      exerciseList.append(newExercise);
    });
  }

});