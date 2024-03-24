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

// Function to generate a unique task id
function generateTaskId() {                             
    nextId++                                            
    localStorage.setItem("nextId", nextId);             
    return nextId;                                     
}

// function to create a tasks and add them to the local storage
function handleAddTask(event) {
    let discardTaskButton = document.querySelector("#dismiss");
    discardTaskButton.addEventListener("click", function() {                
        document.querySelector("#task").value = "";                         
        document.querySelector("#description").value = "";                  
        document.querySelector("#deadline").value = "";                     
    });
    
    let createTaskButton = document.querySelector("#create-task");
    createTaskButton.addEventListener("click", function() {                 
        let task = {                                                        
            id: generateTaskId(),                                               
            task: document.querySelector("#task").value,                       
            description: document.querySelector("#description").value,          
            deadline: document.querySelector("#deadline").value,                
        };
        
        toDo.push(task);                                                   
        localStorage.setItem("toDo", JSON.stringify(toDo));                 
        createTaskCard(task);                                               
        
        document.querySelector("#task").value = "";                         
        document.querySelector("#description").value = "";                  
        document.querySelector("#deadline").value = "";                     
    });
    //function to create a task and add them to the first to-do column
function createTaskCard(task) {                                                                                                                         
    taskCard.setAttribute("class", "task-card");                                                                                                        
    taskCard.setAttribute("id", task.id);                                                                                                               
    taskCard.setAttribute("style", "z-index: 1");                                                                                                       
    taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button>`;     
    document.querySelector("#todo-cards").appendChild(taskCard);                                                                                       
    
    checkDeadlines(task, taskCard);                                                                                                                     
    handleDrag(task, taskCard);                                                                                                                         
    handleDeleteTask(task);                                                                                                                             

//checkDeadlines function check how close the timeline is for each date picked

function checkDeadlines(task, taskCard) {                       
   //setting some variables for the date and checking the condition for the date
    let currentDate = dayjs()
    let taskDate = dayjs(task.deadline);
    let dateDifference = taskDate.diff(currentDate, "day")
   
    if (dateDifference <= -1) {                                 
        taskCard.classList.add("overdue");                      
    } else if (dateDifference <= 6) {                          
        taskCard.classList.add("close");             
    } else {                                                    
        taskCard.classList.add("no-rush");               
    }
}

// function to handle deleting a task

function handleDeleteTask(task) {                                                              
    let deleteButton = document.querySelectorAll(".delete-button");                             
    deleteButton.forEach(function(button) {                                                     
        button.addEventListener("click", function() {                                           
            let taskCard = button.closest(".task-card");                                        
            let taskCardId = taskCard.getAttribute("id");                                       
            taskCard.remove();                                                                  
            
            if (toDo.some(i => i.id === parseInt(taskCardId))) {                                
                toDo = toDo.filter(task => task.id !== parseInt(taskCardId));                   
            }
            if (inProgress.some(i => i.id === parseInt(taskCardId))) {                          
                inProgress = inProgress.filter(task => task.id !== parseInt(taskCardId));       
            }
            if (done.some(i => i.id === parseInt(taskCardId))) {                               
                done = done.filter(task => task.id !== parseInt(taskCardId));                  
            }
            
            localStorage.setItem("toDo", JSON.stringify(toDo));                                 
            localStorage.setItem("inProgress", JSON.stringify(inProgress));                     
            localStorage.setItem("done", JSON.stringify(done));                                 
        })
    })
}


