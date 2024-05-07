
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
    status: "to-do"
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
    .attr("data-task-id", task.id)
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
    const delBtn = $("<button>").addClass("btn btn-danger delete-btn").text("Delete").attr("data-task-id", task.id);
    delBtn.on("click", handleDeleteTask)

    if (task.status === "done" || task.status === "done-cards") {
        cardBody.addClass("btn-success"); // Changes div to green
    } else if (task.status === "in-progress") {
        cardBody.addClass("btn-warning"); // Changes div to yellow
    }
    
    
    
    // Append card title, text, and delete button to card body
    cardBody.append(cardTitle, cardText, delBtn);

    // Append card header and body to card
    card.append(cardHeader, cardBody);
    console.log(card)
    return card

}

/// Todo: create a function to render the task list and make cards draggable
function renderTaskList() { 
    $("#todo-cards").empty()
    $('#in-progress-cards').empty()
    $('#done-cards').empty()
    let tasks = JSON.parse(localStorage.getItem("Ntasks")) || [];

    for(let i =0; i < tasks.length; i++){

        if(tasks[i].status === "to-do"){
                $('#todo-cards').append( createTaskCard(tasks[i]))
                
        }
        else if(tasks[i].status === "in-progress"){
        $('#in-progress-cards').append( createTaskCard(tasks[i]))
        
    }

    else{  $('#done-cards').append( createTaskCard(tasks[i]))

    }
      
       
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
    const taskId = $(this).attr("data-task-id");
    console.log(taskId)

    // Find the card containing the task ID
    const card = $(event.target).closest(".card[data-task-id='" + taskId + "']");

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
            renderTaskList()
        }
    }

    console.log('handleDeleteTask');
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    console.log("dropped")

   const taskId = ui.draggable[0].dataset.taskId
   const newStatus =event.target.id
   console.log(taskId, newStatus)

   for (let i = 0; i < tasks.length; i++) {
   
   
    if (tasks[i].id ===taskId) {
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
        accept:'.drag',
        drop: handleDrop
    })

});