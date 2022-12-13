timeDisplayEl = $("#currentDay")
tzDisplayEl = $("#currentTZ")
eventsContainerEl = $("#events-container")
clearBtnEl = $("#clearBtn");


$(function () {  
  // Function saves events to localStorage when the save button is clicked
  function saveEvent(e) {
    e.preventDefault();
    var hourToSave = $(this).parents("div.time-block").attr("id");
    var textToSave = $(this).siblings("textarea").val();
    localStorage.setItem(hourToSave, textToSave);
  };
  
  // Save button event listener binding
  eventsContainerEl.on("click", ".saveBtn", saveEvent)


  function checkTime() {
    var utc = window.dayjs_plugin_utc;
    var timezone = window.dayjs_plugin_timezone;
    dayjs.extend(utc)
    dayjs.extend(timezone)
    var timezoneToSet = dayjs.tz.guess()
    currentHour = dayjs().format('H', timezoneToSet);
    for (i = 8; i < 18; i++) {
      var hourToChange =  "#hour-" + i;
      if (currentHour == i) {
         $(hourToChange).removeClass("future");
         $(hourToChange).removeClass("past");
         $(hourToChange).addClass("present");
      } else if (currentHour < i) {
        $(hourToChange).removeClass("present");
        $(hourToChange).removeClass("past");
        $(hourToChange).addClass("future");
      } else if (currentHour > i) {
        $(hourToChange).removeClass("present");
        $(hourToChange).removeClass("future");
        $(hourToChange).addClass("past");
      }
    };
  };

  
  
  // Function verifies if anything is saved and localStorage and displays any saved events onto timeblocks textarea
  function getSavedEvents() {
    for (i = 8; i < 18; i++) {
      var hourToGet =  "hour-" + i;
      textToGet = localStorage.getItem(hourToGet);
      if (textToGet === null) {
        eventsContainerEl.children("#" + hourToGet).children("textarea").html("");
      } else {
          eventsContainerEl.children("#" + hourToGet).children("textarea").html(textToGet);
      }
    }
  };
  
  // Fucntion displays date and time based on user's system timezone
  function displayTime() {
    var utc = window.dayjs_plugin_utc;
    var timezone = window.dayjs_plugin_timezone;
    dayjs.extend(utc)
    dayjs.extend(timezone)
    // var timezoneToSet = dayjs.tz.guess()
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
    // tzDisplayEl.text("Your current system timezone is: " + timezoneToSet);
  }

  // Clear events from localStorage
  function clearSchedule() {
    confirmModal = confirm("Are you sure you want to clear your schedule? This action is not reversible!");
    console.log(confirmModal);
    if (confirmModal) {
      for (i = 8; i < 18; i++) {
        var itemToRemove =  "hour-" + i;
        localStorage.removeItem(itemToRemove);
      };
    getSavedEvents();
    };
  };

  clearBtnEl.click(clearSchedule);
  
  setInterval(displayTime, 1000);
  setInterval(checkTime, 10000);
  
  function init() {
    getSavedEvents();
    checkTime();
  }
  
  init();

});