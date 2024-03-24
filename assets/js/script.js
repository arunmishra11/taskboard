// Assigning a variable for the start of an id-starting at 0
let nextId = 0;

//Creting a global variable for multiple functions
let taskCard;

// variables for arrays for different stages of the tasks
let toDo = [];
let inProgress = [];
let done = [];


// Function to render the task list 
function renderTaskList() {                                                                                                                                 // WHEN the task list is rendered
    toDo = JSON.parse(localStorage.getItem("toDo")) || [];                                                                                                  // THEN the toDo items in local storage are checked
    toDo.forEach(task => {                                                                                                                                  // FOR EACH task in the toDo category
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.setAttribute("style", "z-index: 1");                                                                                                       // THEN the card is moved to the front of the page so nothing will cover it
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#todo-cards").appendChild(taskCard);                                                                                        // THEN the <p> tag is appended to the todo-cards section in the DOM

        checkDeadlines(task, taskCard);                                                                                                                     // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
        handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
        handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
    })

    inProgress = JSON.parse(localStorage.getItem("inProgress")) || [];                                                                                      // THEN the inProgress items in local storage are checked
    inProgress.forEach(task => {                                                                                                                            // FOR EACH task in the inProgress category
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.setAttribute("style", "z-index: 1");                                                                                                       // THEN the card is moved to the front of the page so nothing will cover it
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#in-progress-cards").appendChild(taskCard);                                                                                 // THEN the <p> tag is appended to the in-progress-cards section in the DOM

        checkDeadlines(task, taskCard);                                                                                                                     // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
        handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
        handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
    })

    done = JSON.parse(localStorage.getItem("done")) || [];                                                                                                  // THEN the done items in local storage are checked
    done.forEach(task => {                                                                                                                                  // FOR EACH task in the done category
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.setAttribute("style", "z-index: 1");                                                                                                       // THEN the card is moved to the front of the page so nothing will cover it
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#done-cards").appendChild(taskCard);                                                                                        // THEN the <p> tag is appended to the done-cards section in the DOM

        checkDeadlines(task, taskCard);                                                                                                                     // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
        handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
        handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
    })
};