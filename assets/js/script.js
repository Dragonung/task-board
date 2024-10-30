//elements with class = "close" (exit out modal)
var closeModal = document.getElementsByClassName("close");

// Retrieve tasks and nextId from localStorage
const taskListJson = localStorage.getItem("tasks");
let taskList = [];
if (taskListJson) {
    taskList = JSON.parse(taskListJson);
}

let nextId = JSON.parse(localStorage.getItem("nextId"));
/* nextId = assigned no.  */
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

// Todo: create a function to generate a unique task id
function generateTaskId() {
    //if nextId doesn't exist,
    if (!nextId) {
        //create a new nextId
        nextId = 0;
    } else {
        //subsequent nextId value will be different from last one
        nextId++;
    }
    //save nextId to local storage
    localStorage.setItem('nextId', JSON.stringify(nextId));
    //return nextId
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const { id, title, description, duedate, status } = task;
    const taskCard = $(`
        <div class="card task-card mb-3" data-id="${id}" data-status="${status}">
            <div class="card body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text">Deadline:<strong> ${dayjs(deadline).format('MM/DD/YYYY')}</p>
                <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash></i></button>
            </div>
        <div>
    `);

    //function for color rendering
    if (task.deadline && task.status !== 'Done'){
        const now = dayjs();
        const taskDueDate = dayjs(task.deadline, 'MM/DD/YYYY');
        if (now.isSame(taskDueDate, 'day')){
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)){
            taskCard.find('.card-body').addClass('bg-danger text-white');
            taskCard.find('.delete-btn').addClass('border-light');
        }
    }
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#to-do").empty();
    $("#in-progress").empty();
    $("done").empty();

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}--cards`).append(taskCard);
    });
    
    /* make task cards draggable & droppable */
    $(".task-card").draggable({
        cursor: "move"
    })
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const taskInput = document.querySelector('#task');
    const dateInput = document.querySelector('date');
    const descInput = document.querySelector('description');
    const status = "to-do";

    if (taskInput && dateInput && descInput){
        const newTask = {
            id: generateTaskId(),
            taskInput,
            descInput,
            dateInput,
            status
        };
    
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", nextId);

    $("formModal").modal("hide");
    $("taskInput").val("");
    $("descInput").val("");
    $("dateInput").val("");

    renderTaskList();
    }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(this).closest(".task-card").data("id");
    taskList = taskList.filter("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data("id");
    const newStatus = $(this).attr("id");

    const taskIndex = taskList.findIndex(task => task.id === taskId);
    taskList[taskIndex].status = newStatus;
   
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $("formModal").on("shown.bs.modal", function() {
        $("#title").focus();
    });

    $("addTaskForm").on("submit"), handleAddTask;

    $(document).on("click", ".delete-btn", handleDeleteTask);

    $(".lane").droppable({
        accept: ".task-card",
        drop: handleDrop()
    });

    $("deadline").datepicker({
        dateFormat: "YY/MM/DDDD"
    });
});
