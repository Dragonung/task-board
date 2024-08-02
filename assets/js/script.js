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

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    /* make task cards draggable & droppable */
    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", () => {
            task.classList.remove("is-dragging");
        });
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    const taskInput = document.querySelector('#task');
    const dateInput = document.querySelector('date');
    const descInput = document.querySelector('description');


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    droppables.forEach((zone) => {
        zone.addEventListener("dragover", (event) => {
            event.preventDefault();

            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");

            if (!bottomTask) {
                zone.appendChild(curTask);
            }
            else {
                zone.insertBefore(curTask, bottomTask);
            }
        });
    });

    const insertAboveTask = (zone, mouseY) => {
        const els = zone.querySelectorAll(".task:not(.is-dragging)");

        let closestTask = null;
        let closestOffset = Number.NEGATIVE_INFINITY;

        els.forEach((task) => {
            const { top } = task.getBoundingClientRect();

            const offset = mouseY - top;

            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestTask = task;
            }
        });

        return closestTask;
    };
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
