
let taskId = JSON.parse(localStorage.getItem("taskId"));
// from my previous code// set variables
let tasktitle = document.getElementById('tasktitle');
let date = document.getElementById('datepicker');
let textarea= document.getElementById('notes');
const submit = document.getElementById("addtask");



// date picker from jquery
$( function() {
    $( "#datepicker" ).datepicker();
  } );
   



// on click of add task btn  collect data 
  document.getElementById("addtask").onclick = function (){ 
    console.log(tasktitle.value);
    console.log(datepicker.value);
    console.log(notes.value); 

// card values
const task = {
    id: generateTaskId(),
    tasktitle: tasktitle.value,
    datepicker: datepicker.value,
    notes: notes.value,
    status: "todo"
};

    let tasks = JSON.parse(localStorage.getItem("Ntasks")) || [];

    tasks.push(task)

    localStorage.setItem('Ntasks', JSON.stringify(tasks));
    renderTaskList()
    
}



// Todo: create a function to generate a unique task id
function generateTaskId() {  

    const taskId =  Math.random().toString(16).slice(2)  
    console.log(taskId)
    return taskId
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // Create card element
    const card = $("<div>")
    .addClass("card text-bg-primary mb-3 drag")
    .attr("data-id", task.id)
    .css("max-width", "18rem"); 


    // Create card header
    const cardHeader = $("<div>").addClass("card-header h3").text( "Title:"+ task.tasktitle);

    // Create card body
    const cardBody = $("<div>").addClass("card-body");

    // card title
    const cardTitle = $("<h5>").addClass("card-title").text("Date: " + task.datepicker);

    //  card text
    const cardText = $("<p>").addClass("card-text").text("Text: " + task.notes);

    //  delete button
    const delBtn = $("<button>").addClass("btn btn-danger delete-btn").text("Delete").attr("data-id", task.id);

    // Append card title, text, and delete button to card body
    cardBody.append(cardTitle, cardText, delBtn);

    // Append card header and body to card
    card.append(cardHeader, cardBody);
    console.log(card)
    // Append card to dom 
    $("#todo").append(card);
}

// Call the function with the task object
//createTaskCard(task);


/// Todo: create a function to render the task list and make cards draggable
function renderTaskList() { 
    $("#todo").empty()
 
    let tasks = JSON.parse(localStorage.getItem("Ntasks")) || [];

    for(let i =0; i < tasks.length; i++){

        console.log("hello")
        createTaskCard(tasks[i])
    }

    $(".drag").draggable({
        zIndex: 900 
    });
    
}



// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    
   

    // const taskId = $(event.target).attr("data-id");

    // // Find the index of the task with the matching ID in the tasks array
    // const taskIndex = tasks.findIndex(task => task.id === taskId);

    // // Check if the task is found
    // if (taskIndex !== -1) {
    //     // Remove the task from the tasks array
    //     tasks.splice(taskIndex, 1);

    //     // Update the tasks array in localStorage
    //     localStorage.setItem("Ntask", JSON.stringify(tasks));

    //     // Remove the card from the DOM
    //     $(event.target).closest(".card").remove()
    // }

    // console.log(handleDeleteTask);
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {


    // $("#todo, #Progress, #done").droppable({
    //     over: function(event, ui) {
    //         // Check if the card is hovering over the "done" area
    //         if ($(".card").attr("id") === "#done") {
    //             // Add your code to execute when the card is hovering over the "done" area
    //             $(this).addClass("ui-state-highlight").find("h5").html("Task complete!");
    //         }
    //     },
    //     drop: function(event, ui) {
    //         // Add drop handling logic here
    //     }
    // });


}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList()
});





