// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
if (!taskList) taskList = [];
if (!nextId) nextId = 1;
// Todo: create a function to generate a unique task id
function generateTaskId() {
  const id = nextId;    
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = $("<div>").addClass("card").attr("id", `task-${task.id}`);
    const cardHeader = $("<div>").addClass("card-header").text(task.name);
    const cardBody = $("<div>").addClass("card-body").text(task.description); // Assuming task object has a description property
  
    // Append cardHeader and cardBody to the card
    card.append(cardHeader, cardBody);
  
    return card;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#to-do, #in-progress, #done").empty();
  
    taskList.forEach((task) => {
      const card = createTaskCard(task);
  
      if (task.status === "toDo") {
        $("#to-do").append(card);
      } else if (task.status === "inProgress") {
        $("#in-progress").append(card);
      } else if (task.status === "done") {
        $("#done").append(card);
      }
    });
  
    $(".card").draggable({
        revert: "invalid",
        helper: "clone"
      });


  }

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
 
    const taskName = $('#task-name').val();
    const taskDueDate = $('#task-due-date').val();
    const taskDescription = $('#task-description').val();
  
    const task = {
      id: generateTaskId(),
      title: taskName,
      dueDate: taskDueDate,
      description: taskDescription,
      status: 'toDo' 
    };
  
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  
    renderTaskList(); // Re-render the task list with the new task
  }

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
event.preventDefault(); 
const id = $(this).closest(".card").attr("id");
taskList = taskList.filter((task) => task.id !== parseInt(id));
localStorage.setItem("tasks", JSON.stringify(taskList));
renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const id = ui.helper.attr("id");
    const task = taskList.find((task) => `task-${task.id}` === id);
  
    if ($(this).attr("id") === "to-do") {
      task.status = "toDo";
    } else if ($(this).attr("id") === "in-progress") {
      task.status = "inProgress";
    } else if ($(this).attr("id") === "done") {
      task.status = "done";
    }
  
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
document.addEventListener("DOMContentLoaded", () => {
    renderTaskList();
    $("#add-task").on("click", handleAddTask);
    $(".delete").on("click", handleDeleteTask);
    $(".lane").droppable({
      drop: handleDrop
    });
    $("#task-due-date").datepicker();       
    });
