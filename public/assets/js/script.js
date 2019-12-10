$(function () {

  $("#new-workout").on("click", function (event) {
    $("#new-workout-div").removeClass("new-workout-hide");
    $("#exercise-title").removeClass("new-workout-hide");
  });

  $("#new-exercise").on("click", function (event) {
    $("#add-exercise").removeClass("new-ex-hide");
  });

});