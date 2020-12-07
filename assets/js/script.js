var timeBlocks = [{
        hour: "8am",
        eventName: "",
        tftime: 8
    },
    {
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

console.log(timeBlocks[9].hour, timeBlocks[9].eventName, timeBlocks[9].tftime);

/*var timeBlocks = ["8am", "9am"[, "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];*/
var timeBlock = $(".container");
var now = dayjs().format('dddd, MMM DD');
now = now + "th";

function displayPlanner() {

    for (j = 0; j < timeBlocks.length; j++) {
        var planRow = $("<form>");
        $(planRow).attr("class", "row");
        $(".container").append(planRow);

        for (var i = 0; i < 3; i++) {
            if (i === 1) {

                var textBox = $("<textarea>");
                $(textBox).text(timeBlocks[j].eventName);
                var currentTime = dayjs().hour();

                switch(parseInt(currentTime) > parseInt(timeBlocks[j].tftime)) {
                    case true:
                        $(textBox).addClass("past");
                        break;
                    case false:
                        console.log("equal to" + (parseInt(currentTime) === parseInt(timeBlocks[j].tftime)));
                        if(parseInt(currentTime) === parseInt(timeBlocks[j].tftime)) {
                            $(textBox).addClass("present");
                        }
                        else {
                            $(textBox).addClass("future");
                        }
                        break;
                    default:
                        break;
                }

                $(textBox).attr("name", j);
                $(textBox).addClass("col-md-9 description");

            } else if (i === 0) {

                var divEl = $("<div>");
                divEl.text(timeBlocks[j].hour);
                $(divEl).addClass("col-md-2 time-block hour");
            } else {
                var savedBtn = $("<button>" + "Save" + "</button>");
                $(savedBtn).addClass("saveBtn");
                $(savedBtn).val(j);
                $(savedBtn).addClass("col-md-1");
            }
        }
        $(planRow).append(divEl, textBox, savedBtn);
    }
}

function initialize() {

    // Get stored events from localStorage
    // Parsing the JSON string to an object
    var eventstry = JSON.parse(localStorage.getItem("Events"));

    // If events were not retrieved from localStorage, update the events array to it
    if (eventstry === null) {
        localStorage.setItem("Events", JSON.stringify(timeBlocks));
    }

    $("#currentDay").text(now);
    timeBlocks = JSON.parse(localStorage.getItem("Events"));
    displayPlanner();
}

initialize();

$(".saveBtn").on("click", function (event) {
    event.preventDefault();

    var whichBtn = this.value;

    eventText = $(this).siblings().next().val();
    whichHour = $(this).siblings().text();

    timeBlocks[whichBtn].eventName = eventText;

    localStorage.setItem("Events", JSON.stringify(timeBlocks));
});

function sortFunction() {
    events.sort(function (a, b) {
        console.log("in sort function");
        return b.hour - a.hour;
    });
}