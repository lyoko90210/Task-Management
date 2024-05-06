
let taskId = JSON.parse(localStorage.getItem("taskId"));
// from my previous code// set variables
let tasktitle = document.getElementById('tasktitle');
let date = document.getElementById('datepicker');
let textarea= document.getElementById('notes');
const submit = document.getElementById("addtask");
let delBtn = document.getElementsByClassName('btn btn-danger delete-btn')
let tasks = JSON.parse(localStorage.getItem("Ntasks")) || [];


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
    .addClass("card text-bg-primary mb-3 drag ")
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


/// Todo: create a function to render the task list and make cards draggable
function renderTaskList() { 
    $("#todo").empty()
 
    let tasks = JSON.parse(localStorage.getItem("Ntasks")) || [];

    for(let i =0; i < tasks.length; i++){

        console.log("hello")
        createTaskCard(tasks[i])
    }

    $(".drag").draggable({
        zIndex: 1000
    });

    
}


// Todo: create a function to handle adding a new task
function handleAddTask(event){



}

// Todo: create a function to handle deleting a task

function handleDeleteTask(event) {
    // Get the ID of the task to delete from the data-id attribute of the clicked button
    const taskId = $(event.target).attr("data-id");

    // Find the card containing the task ID
    const card = $(event.target).closest(".card[data-id='" + taskId + "']");

    // Check if the card is found
    if (card.length) {
        // Remove the card from the DOM
        card.remove();

        // Remove the task from the tasks array
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            // Update the tasks array in localStorage
            localStorage.setItem("Ntasks", JSON.stringify(tasks));
        }
    }

    console.log('handleDeleteTask');
}



// run the deletetask funtion on click 
$(document).on("click", ".delete-btn", function() {
    // Inside this function, "this" refers to the clicked delete button
    const taskId = $(this).attr("data-id"); // Get the ID of the task to delete
    handleDeleteTask(taskId); // Call the handleDeleteTask function with the task ID
});









// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {


   const taskId = ui.draggable[0].dataset.taskId
   const newStatus =event.target.id

   for (let i = 0; i < tasks.length; i++) {
   
   
    if (tasks[i].id===parseInt(taskId)) {
        tasks[i].status= newStatus

    }
}
localStorage.setItem('Ntasks', JSON.stringify(tasks))
renderTaskList()

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList()        
    $('.lane').droppable({
        accpect:'.drag',
        drop: handleDrop
    })

});