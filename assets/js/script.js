// Assigning a variable for the start of an id-starting at 0
let nextId = 0;

//Creting a global variable for multiple functions
let taskCard;

// variables for arrays for different stages of the tasks
let toDo = [];
let inProgress = [];
let done = [];

// displaying today's date on top of the page
document.querySelector("#today-date").innerHTML = "Today's date: " + dayjs().format("MM-DD-YYYY");