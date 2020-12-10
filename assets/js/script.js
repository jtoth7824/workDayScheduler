/* array containing each timeblock set of info */
var timeBlocks = [{
        hour: "9am",
        eventName: "",
        tftime: 9
    },
    {
        hour: "10am",
        eventName: "",
        tftime: 10
    },
    {
        hour: "11am",
        eventName: "",
        tftime: 11
    },
    {
        hour: "12pm",
        eventName: "",
        tftime: 12
    },
    {
        hour: "1pm",
        eventName: "",
        tftime: 13
    },
    {
        hour: "2pm",
        eventName: "",
        tftime: 14
    },
    {
        hour: "3pm",
        eventName: "",
        tftime: 15
    },
    {
        hour: "4pm",
        eventName: "",
        tftime: 16
    },
    {
        hour: "5pm",
        eventName: "",
        tftime: 17
    }
];

/* grab current day using day js to display at top of planner */
var now = dayjs().format('dddd, MMM DD');

/* clear out event names */
function clearEvents() {
    for (var m = 0; m < timeBlocks.length; m++) {
        timeBlocks[m].eventName = "";
    }
}

/* function that will display the colorized planner rows along with any stored events */
function displayPlanner() {

    /* loop through all timeblock array elements */
    for (j = 0; j < timeBlocks.length; j++) {
        /* create form to store the remaining row element tags into */
        var planRow = $("<form>");
        $(planRow).attr("class", "row");
        /* append form tag to html page */
        $(".container").append(planRow);

        /* loop through once for each column to add to row */
        /* this helps to create grid object */
        for (var i = 0; i < 3; i++) {

            /* create div to hold time information */
            if (i === 0) {
                var divEl = $("<div>");
                divEl.text(timeBlocks[j].hour);
                /* add bootstrap class to size column */
                $(divEl).addClass("col-2 time-block hour");

                /* create textarea that is for user input */
            } else if (i === 1) {

                var textBox = $("<textarea>");
                $(textBox).text(timeBlocks[j].eventName);
                /* grab current time using day js for colorizing the timeblocks */
                var currentTime = dayjs().hour();

                /* decide whether current time is greater than the timeblock value based on index of array */
                switch (parseInt(currentTime) > parseInt(timeBlocks[j].tftime)) {
                    /* if greater than, then style textbox using "past" */
                    case true:
                        $(textBox).addClass("past textarea");
                        break;
                    case false:
                        /* decide if current equal to timeblock value based on index of array */
                        if (parseInt(currentTime) === parseInt(timeBlocks[j].tftime)) {
                            /* if equal, then style textbox using "present" */
                            $(textBox).addClass("present textarea");
                        } else {
                            /* if less than, then style textbox using "future" */
                            $(textBox).addClass("future textarea");
                        }
                        break;
                    default:
                        break;
                }

                /* add bootstrap class to size column */
                $(textBox).addClass("col-9 description");

                /* Else create save button */
            } else {
                var savedBtn = $("<button>");
                /* add class to style the Save button */
                $(savedBtn).addClass("saveBtn");
                $(savedBtn).val(j);
                /* add bootstrap class to size column */
                $(savedBtn).addClass("col-1");
                $(savedBtn).append("<img class='img-fluid' src='assets/images/SaveButton.ico'/>");
            }
        }
        /* add all 3 elements to the current form row */
        $(planRow).append(divEl, textBox, savedBtn);
    }
}

function initialize() {

    // Get stored events from localStorage
    // Parsing the JSON string to an object
    var eventStored = JSON.parse(localStorage.getItem("Events"));
    var retrievedDate = localStorage.getItem("Date");

    // If events were not retrieved from localStorage, update the events array to it
    if ((eventStored === null) || retrievedDate === null) {
        localStorage.setItem("Events", JSON.stringify(timeBlocks));
        localStorage.setItem("Date", now);
    }

    /* clear events if retrieved date doesn't match current date */
    if (!(retrievedDate === now)) {
        clearEvents();
    } else {
        /* retrieve any existing event information from local storage if retrieved date matches current date*/
        timeBlocks = JSON.parse(localStorage.getItem("Events"));
    }

    /* display current day on the planner page */
    $("#currentDay").text(now + "th");

    /* call to display the planner elements */
    displayPlanner();
}

initialize();

/* event listener for save button */
$(".saveBtn").on("click", function (event) {
    event.preventDefault();

    /* store which Save button index was clicked */
    var whichBtn = this.value;

    /* store the event text based upon the row the save button was in */
    eventText = $(this).siblings().next().val();

    /* use saved button index to correctly save event text to array */
    timeBlocks[whichBtn].eventName = eventText;

    /* store updated event and date information to local storage */
    localStorage.setItem("Events", JSON.stringify(timeBlocks));
    localStorage.setItem("Date", now);
});