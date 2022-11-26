
// Wrapped all code that interacts with the DOM to ensure that the code isn't run until
// the browser has finished rendering all the elements in the html.
$(document).ready(function () {

  $(function () {
    for (i = 9; i < 18; i++) {
      var divContainer = $("<div>");
      divContainer.attr('id', 'hour-' + `${i}`);
      divContainer.addClass("row");

      var divContainer2 = $("<div>");
      divContainer2.addClass("col-1 hour")
      divContainer2.text(`${i}`);

      var textareEl = $("<textarea>");
      textareEl.addClass("col-10 plan");

      var buttonEl = $("<button>");
      buttonEl.attr("id", "save");
      buttonEl.addClass("col-1");
      buttonEl.text("Save");

      var icon = $("<i aria-hidden='true'></i>");
      icon.addClass("fa fa-save")
      buttonEl.append(icon);

      divContainer.append(divContainer2);
      divContainer.append(textareEl);
      divContainer.append(buttonEl);

      $("#planner").append(divContainer)
    }
  })


  // TODO: Add a listener for click events on the save buttonEl. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the buttonEl that was clicked? How might the id be
  // useful when saving the description in local storage?
  // ----------- enter an event / WHEN I click the save buttonEl for that time block
  // THEN the text for that event is saved in local storage

  $(".row").click(function (event) {
    var target = $(event.target);
    if (target.is("button")) {
      var plan = $(this).children(".plan").val();
      var hour = parseInt($(this).attr("id"));
    }
    // Save in local storage
    localStorage.setItem(hour, plan);
  }
  )

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function checkTime() {
    var currentHour = 12;
    $(".row").each(function () {
      var timeBlock = parseInt($(this).attr("id"))
      if (currentHour > timeBlock) {
        $(this).addClass('past')
      }
      else if (currentHour == timeBlock) {
        $(this).addClass('present')
      }
      else if (currentHour < timeBlock) {
        $(this).addClass('future')
      }

    });
  }

  checkTime()

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textareEl elements. HINT: How can the id
  // attribute of each time-block be used to do this?

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

  displayPlanner();

})

// TODO: Add code to display the current date in the header of the page.
$("#currentDay").text(moment().format('MMMM Do YYYY, H:mm a'));

