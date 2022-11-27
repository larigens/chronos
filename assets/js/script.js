
// Variable/Constant Declaration
const nine = 9;
const twelve = 12;
const eighteen = 18;
const div = "<div>";

// Wrapped all code that interacts with the DOM to ensure that the code isn't run until
// the browser has finished rendering all the elements in the html.
$(document).ready(function () {

  // Added code to display the current date in the header of the page.
  $("#currentDay").text(moment().format('MMMM Do YYYY, hh:mm a'));

  createPlanner();
  checkTime();
  displayPlanner();

});

function createPlanner() {
  for (hour = nine; hour < eighteen; hour++) {
    var timeBlockContainer = $(div);
    timeBlockContainer.attr('id', 'hour-' + `${hour}`);
    timeBlockContainer.addClass("row");

    var hourContainer = $(div);
    hourContainer.addClass("col-1 hour");
    hourContainer.text(checkAmPm(hour));

    var textareaEl = $("<textarea>");
    textareaEl.addClass("col-10 plan");

    var buttonEl = $("<button>");
    buttonEl.attr("id", "save");
    buttonEl.addClass("col-1");
    buttonEl.text("Save");

    var iconEl = $("<i aria-hidden='true'></i>");
    iconEl.addClass("fa fa-save");
    buttonEl.prepend(iconEl);

    timeBlockContainer.append(hourContainer);
    timeBlockContainer.append(textareaEl);
    timeBlockContainer.append(buttonEl);

    $("#planner").append(timeBlockContainer);
  }

  $(".row").click(function (event) {
    var target = $(event.target);
    if (target.is("button")) {
      var hourId = $(this).attr("id");
      var plan = $(this).find(".plan").val();
      // Save in local storage
      localStorage.setItem(hourId, plan);
    }
  }
  )
}

function checkAmPm(hour) {
  if (hour > twelve) {
    hour -= twelve;
    hour += " pm"
  }
  else if (hour === twelve) {
    hour += " pm"
  }
  else {
    hour += " am"
  }
  return hour;
}

function checkTime() {
  var currentHour = moment().hour();
  $(".row").each(function () {
    var timeBlock = $(this).attr("id");
    var checkHour = parseInt(timeBlock.slice(5));
    if (currentHour > checkHour) {
      $(this).addClass('past')
    }
    else if (currentHour == checkHour) {
      $(this).addClass('present')
    }
    else if (currentHour < checkHour) {
      $(this).addClass('future')
    }
  });
}

function displayPlanner() {
  $(".row").each(function () {
    var hourId = $(this).attr("id");
    var plan = localStorage.getItem(hourId);
    if (plan !== null) {
      $(this).children(".plan").val(plan);
    }
  }
  )
}


// TODO: Add a listener for click events on the save buttonEl. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the buttonEl that was clicked? How might the id be
// useful when saving the description in local storage?
// ----------- enter an event / WHEN I click the save buttonEl for that time block
// THEN the text for that event is saved in local storage



// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?



// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textareEl elements. HINT: How can the id
// attribute of each time-block be used to do this?






