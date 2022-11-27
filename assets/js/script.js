
// Wrapped all code that interacts with the DOM to ensure that the code isn't run until
// the browser has finished rendering all the elements in the html.
$(document).ready(function () {

  for (i = 9; i < 18; i++) {
    var divContainer = $("<div>");
    divContainer.attr('id', 'hour-' + `${i}`);
    divContainer.addClass("row");

    var divContainer2 = $("<div>");
    divContainer2.addClass("col-1 hour");
    divContainer2.text(checkAmPm(i));

    var textareaEl = $("<textarea>");
    textareaEl.addClass("col-10 plan");

    var buttonEl = $("<button>");
    buttonEl.attr("id", "save");
    buttonEl.addClass("col-1");
    buttonEl.text("Save");

    var icon = $("<i aria-hidden='true'></i>");
    icon.addClass("fa fa-save");
    buttonEl.prepend(icon);

    divContainer.append(divContainer2);
    divContainer.append(textareaEl);
    divContainer.append(buttonEl);

    $("#planner").append(divContainer);
  };

  function checkAmPm(i) {
    if (i > 12) {
      i = i - 12;
      i += " pm"
    }
    else if (i === 12) {
      i += " pm"
    }
    else {
      i += " am"
    }
    return i;
  }



  $(".row").click(function (event) {
    var target = $(event.target);
    if (target.is("button")) {
      var hour = $(this).attr("id");
      var plan = $(this).find(".plan").val();
      // Save in local storage
      localStorage.setItem(hour, plan);
    }
  }
  );

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

  checkTime()

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

  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(moment().format('MMMM Do YYYY, hh:mm a'));

});


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






