// Variable Declaration
var hours = 9;
var currentHour = moment().format('HH');

// Today's time
$("#currentDay").text(moment().format('MMMM Do YYYY, H:mm a'));

// Wrapped all code that interacts with the DOM to ensure that the code isn't run until
// the browser has finished rendering all the elements in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  $(".time-block").click(function (event) {
    var target = $(event.target);
    if (target.is("button")) {

      // If there is no saved data, then renders an empty array.
      var storage = JSON.parse(localStorage.getItem("storage")) || [];
      console.log(storage);
      return storage;
    }
  })

  $(".time-block").each(function (storage) {
    var planHour = {
      plan: $(this).children("textarea .plan").val(),
      hour: parseInt($(this).attr("id"))
    }
    // ID is in a string, so I need to convert to an integer to be able to compare
    console.log(planHour.hour)

    if (currentHour > planHour.hour) {
      // $('.hour').addClass('past')
      $(this).addClass('past')
      // $('#save').addClass('past')
    }
    else if (currentHour == planHour.hour) {
      $(this).addClass('present')
    }
    else if (currentHour < planHour.hour) {
      $(this).addClass('future')
    }

    // Saves the data in the storage array.
    storage.push(planHour);

    // Gets the id of the parent element to store the data according to the hour.
    // Need to store here or it will always get the first id.
    // Need to convert the object to a string before storing it, or it'll return [object, object].
    localStorage.setItem("storage", JSON.stringify(storage));
    // To not overwrite the stored data.
    $(".plan").innerHTML = "";
    for (i = 0; i < storage.length; i++) {
      planHour.plan = storage[i].plan;
    }

  })


}
)




  // How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // ---------- time blocks for standard business hours (color-coded to indicate whether it is in the past, present, or future)
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // ----------- enter an event / WHEN I click the save button for that time block
  // THEN the text for that event is saved in local storage
  //
