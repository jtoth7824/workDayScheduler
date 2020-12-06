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
                    $(textBox).addClass("col-md-8");
                }
                else if(i===0){

                    var divEl = $("<div>");
                    $(divEl).addClass("col");
                    divEl.text(timeBlocks[j]);
                    $(divEl).addClass("col-md-1");
                }
                else{
                    var savedBtn= $("<button>" + "Save" + "</button>");
                    $(savedBtn).addClass("saveBtn");
                    $(savedBtn).val(j);
                    $(savedBtn).addClass("col-md-3");
                }
            }
            $(planRow).append(divEl, textBox, savedBtn);
        }
}

function saveEvents() {
    localStorage.setItem("Events", JSON.stringify(storedEvents)); 
    
}

function initialize() {
   
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
