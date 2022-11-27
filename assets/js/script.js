// Constant Declaration
const nine = 9;
const twelve = 12;
const eighteen = 18;
const div = "<div>";

// Will only run once the page DOM is ready for JavaScript code to execute. Shorthand for $(document).ready(function ())
$(function () {

  // Added code to display the current date in the page header.
  $("#currentDay").text(moment().format('MMMM Do YYYY, hh:mm a'));

  // Calls all functions so they can be executed.
  renderPlanner();
  checkTime();
  renderStorage();

});

// Creates the planner elements and attaches them.
function renderPlanner() {
  // Loop to continue generating the elements for all working hours.
  for (hour = nine; hour < eighteen; hour++) {
    var timeBlockContainer = $(div);
    timeBlockContainer.attr('id', 'hour-' + `${hour}`);
    timeBlockContainer.addClass("row");

    // Child elements of the time block container.
    var hourContainer = $(div);
    hourContainer.addClass("col-1 hour");
    hourContainer.text(checkAmPm(hour));

    var textareaEl = $("<textarea>");
    textareaEl.addClass("col-10 plan");

    var buttonEl = $("<button>");
    buttonEl.attr("id", "save");
    buttonEl.addClass("col-1");
    buttonEl.text("Save");

    var iconEl = $("<i>");
    iconEl.addClass("fa fa-save");
    buttonEl.prepend(iconEl);

    // Appends the child elements to their parent time block container.
    timeBlockContainer.append(hourContainer);
    timeBlockContainer.append(textareaEl);
    timeBlockContainer.append(buttonEl);

    // Attaches the time block container to the parent planner container.
    $("#planner").append(timeBlockContainer);
  }

  // Added the event listener to the entire row.
  $(".row").click(function (event) {
    var target = $(event.target); // Event.target was added to locate where the user clicked.
    if (target.is("button")) {  // Conditional statement to ensure that the function will only be executed if the button is clicked.
      var hourId = $(this).attr("id");
      var plan = $(this).find(".plan").val();
      // Save to local storage with the hour id to ensure that the text will be saved and displayed only for that specific time block.
      localStorage.setItem(hourId, plan);
    }
  }
  )
}

// Function to make the displayed time more understandable for users, since the 24-hour model is not common.
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

// Function to make each row color-coded to indicate whether it is in the past, present, or future.
function checkTime() {
  // Code in the 24-hour time for easy comparison.
  var currentHour = moment().hour();
  $(".row").each(function () {
    var hourId = $(this).attr("id");
    // Slices the string to get only the hour and converts it to a number for comparison.
    var timeBlockHour = parseInt(hourId.slice(5));
    if (currentHour > timeBlockHour) {
      $(this).addClass('past')
    }
    else if (currentHour == timeBlockHour) {
      $(this).addClass('present')
    }
    else if (currentHour < timeBlockHour) {
      $(this).addClass('future')
    }
  });
}

// Function to display the local storage whenever the user loads the page.
function renderStorage() {
  $(".row").each(function () {
    var hourId = $(this).attr("id");
    var plan = localStorage.getItem(hourId);
    if (plan !== null) {
      $(this).children(".plan").val(plan);
    }
  }
  )
}