
var tryme; 
    
tryme = dayjs('2019-01-25').format('DD/MM/YYYY')

    console.log(tryme);

var events = {
    hour: "",
    eventName: ""
}

var timeBlocks = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var timeBlock = $(".container");

function retrieveEvents() {

    var storedEvents = JSON.parse(localStorage.getItem("Events"));

    if (storedEvents === null) {
        localStorage.setItem("Events", JSON.stringify(events));
    }
}

/*var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)
dayjs().format('L LT')*/
var now = dayjs().format('dddd, MMM DD');
now = now + "th";

function displayPlanner() {
    
        for (j = 0; j <timeBlocks.length; j++) {
            var planRow = $("<form>");
            $(planRow).attr("class", "row");
            $(".container").append(planRow);

            for (var i = 0; i < 3; i++) {
                if (i === 1) {
                    
                    var textBox = $("<textarea>");
                    $(textBox).text("This is the text area");
                    $(textBox).addClass("present");
                    $(textBox).attr("name", j);
                    $(textBox).addClass("col-md-9 description");
                }
                else if(i===0){

                    var divEl = $("<div>");
                    divEl.text(timeBlocks[j]);
                    $(divEl).addClass("col-md-2 time-block hour");
                }
                else{
                    var savedBtn= $("<button>" + "Save" + "</button>");
                    $(savedBtn).addClass("saveBtn");
                    $(savedBtn).val(j);
                    $(savedBtn).addClass("col-md-1");
                }
            }
            $(planRow).append(divEl, textBox, savedBtn);
        }
}

function saveEvents() {
    localStorage.setItem("Events", JSON.stringify(storedEvents)); 
    
}

function initialize() {

    $("#currentDay").text(now);
    retrieveEvents();
    displayPlanner();
}

initialize();

$(".planner").on("click", function (event) {
    event.preventDefault();

 /*   event.target.innerText.indexOf(questionSet.correctanswer[questionNum - 1]) != -1)*/

    console.log(event.target.innerText);

    var newEvent = this.value;

    var textarea = $(".textarea");

    var textfield;

    for(var i=0; i<timeBlocks.length; i++) {
        if(textarea[i].name === i) {
            textfield = textarea[i].value;
        }
    }

/*    console.log(textarea[this.value].attr("name"));*/


 /*   events.eventName = */

});
