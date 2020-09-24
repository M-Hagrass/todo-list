// Define input and add tasks section variables
const personNameInput = document.querySelector('.personNameInput');
const personNameHead = document.querySelector('.personNameHead');
const personNameSpan = document.querySelector('.personNameSpan');
const btnOk = document.querySelector('.ok');
const PersonNameContainer = document.querySelector('.PersonNameContainer');
const form = document.querySelector('form');
const formInput = document.querySelector('.formInput');
const btnClearList = document.querySelector('.btnClearList');

// Define Filter and remove tasks section variables
const filterInput = document.querySelector('.filterInput');
const tasksList = document.querySelector('.tasksList');

// Run all event listeners
runAllEventListeners();

// Assign all event listeners
function runAllEventListeners(){
  // Add person name event
  btnOk.addEventListener('click', personName)
  // Add New task event
  form.addEventListener('submit', addTask)
  // Remove tasks
  tasksList.addEventListener('click', removeTask)
  // Clear all tasks list
  btnClearList.addEventListener('click', clearTasks)  
  // Filter tasks list
  filterInput.addEventListener('keyup', filterTask)  
}

// Create person name function
function personName(){
    console.log(personNameInput.value);
    personNameSpan.innerText = '';
    personNameSpan.appendChild(document.createTextNode(personNameInput.value));
    personNameInput.value = '';
    PersonNameContainer.style.display = 'none';
    personNameHead.style.fontSize = '1.2rem';
}

// Create addTask function
function addTask(e){
  e.preventDefault();
  // Create li
  const li = document.createElement('li');
  li.className = 'taskItem';
  li.appendChild(document.createTextNode(formInput.value));
  // Create link
  const link = document.createElement('a');
  link.setAttribute("href", "#");
  link.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(link);
  tasksList.appendChild(li);
  setTasksToLocalStorage(formInput.value);
  formInput.value = '';
}

// Create setTasksToLocalStorage function
function setTasksToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create removeTask function
function removeTask(e){
  e.preventDefault();
  if(e.target.classList.contains('fa-times')){
    if(confirm('Are you sure')){
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Create clearTasks function
function clearTasks(){
  if(confirm('Are sure! You will lost all your tasks')){
    // tasksList.innerHTML = '';
    while(tasksList.lastChild){
      tasksList.removeChild(tasksList.lastChild)
    }
    // Clear localStorage
    localStorage.clear();
  }
}

// Create filterTask function
function filterTask(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.taskItem').forEach(function(task, index){
    const taskContent = task.textContent.toLowerCase();
    if(taskContent.indexOf(text) !== -1){
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  })
}