// Assigning a variable for the start of an id-starting at 0
let nextId = 0;

// Creating a global variable for multiple functions
let taskCard;

// Variables for arrays for different stages of the tasks
let toDo = [];
let inProgress = [];
let done = [];

// Function to render the task list
function renderTaskList() {
    toDo = JSON.parse(localStorage.getItem("toDo")) || [];
    toDo.forEach(task => {
        createTaskCard(task, "#todo-cards");
    });

    inProgress = JSON.parse(localStorage.getItem("inProgress")) || [];
    inProgress.forEach(task => {
        createTaskCard(task, "#in-progress-cards");
    });

    done = JSON.parse(localStorage.getItem("done")) || [];
    done.forEach(task => {
        createTaskCard(task, "#done-cards");
    });
}

// Function to generate a unique task id
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextId", nextId);
    return nextId;
}

// Function to create a task card and add it to the specified container
function createTaskCard(task, containerId) {
    let taskCard = document.createElement("p");
    taskCard.setAttribute("class", "task-card");
    taskCard.setAttribute("id", task.id);
    taskCard.setAttribute("style", "z-index: 1");
    taskCard.innerHTML =
        task.task +
        "<br>" +
        task.description +
        "<br>" +
        task.deadline +
        "<br>" +
        `<button class="delete-button">delete</button>`;
    document.querySelector(containerId).appendChild(taskCard);

    checkDeadlines(task, taskCard);
    handleDrag(task, taskCard);
    handleDeleteTask(task);
}

// Function to handle adding a task
function handleAddTask(event) {
    let createTaskButton = document.querySelector("#create-task");
    createTaskButton.addEventListener("click", function () {
        let task = {
            id: generateTaskId(),
            task: document.querySelector("#task").value,
            description: document.querySelector("#description").value,
            deadline: document.querySelector("#deadline").value,
        };

        toDo.push(task);
        localStorage.setItem("toDo", JSON.stringify(toDo));
        createTaskCard(task, "#todo-cards");

        document.querySelector("#task").value = "";
        document.querySelector("#description").value = "";
        document.querySelector("#deadline").value = "";
    });
}

// Function to check deadlines
function checkDeadlines(task, taskCard) {
    let currentDate = dayjs();
    let taskDate = dayjs(task.deadline);
    let dateDifference = taskDate.diff(currentDate, "day");

    if (dateDifference <= -1) {
        taskCard.classList.add("overdue");
    } else if (dateDifference <= 6) {
        taskCard.classList.add("close");
    } else {
        taskCard.classList.add("no-rush");
    }
}

// Function to handle deleting a task
function handleDeleteTask(task) {
    let deleteButton = document.querySelectorAll(".delete-button");
    deleteButton.forEach(function (button) {
        button.addEventListener("click", function () {
            let taskCard = button.closest(".task-card");
            let taskCardId = taskCard.getAttribute("id");
            taskCard.remove();

            // Remove the task from the appropriate array
            let removeFromArray = arr => arr.filter(t => t.id !== parseInt(taskCardId));
            toDo = removeFromArray(toDo);
            inProgress = removeFromArray(inProgress);
            done = removeFromArray(done);

            // Update localStorage
            localStorage.setItem("toDo", JSON.stringify(toDo));
            localStorage.setItem("inProgress", JSON.stringify(inProgress));
            localStorage.setItem("done", JSON.stringify(done));
        });
    });
}

// Function to handle dragging tasks
function handleDrag(task, taskCard) {
    $(taskCard).draggable({
        containment: "document",
        connectToSortable: "#toDo, #inProgress, #complete",
        stop: function (event, ui) {
            let taskCardId = taskCard.getAttribute("id");

            if ($(ui.helper).parent().is("#toDo")) {
                toDo.push(task);
            } else if ($(ui.helper).parent().is("#inProgress")) {
                inProgress.push(task);
            } else if ($(ui.helper).parent().is("#complete")) {
                done.push(task);
            }

            // Remove the task from its previous array
            toDo = toDo.filter(t => t.id !== parseInt(taskCardId));
            inProgress = inProgress.filter(t => t.id !== parseInt(taskCardId));
            done = done.filter(t => t.id !== parseInt(taskCardId));

            // Update localStorage
            localStorage.setItem("toDo", JSON.stringify(toDo));
            localStorage.setItem("inProgress", JSON.stringify(inProgress));
            localStorage.setItem("done", JSON.stringify(done));
        },
    });

    $("#toDo, #inProgress, #complete").sortable();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    nextId = localStorage.getItem("nextId");
    renderTaskList();
    handleAddTask();
});
