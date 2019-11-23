let template = document.querySelector('#temp').innerHTML
let button = document.querySelector('.add')
let container = document.querySelector('.container')
let task = document.querySelector('#task')
let title = document.querySelector('.title')

task.style.height = "100px"
task.style.fontSize = "30px"

let taskText = ""
let newTask = []

//generating existing tasks if there are any
if (localStorage.db) {
  var db = JSON.parse(localStorage.db)
  loadTasks()
  taskId = db.length
} else {
  var db = [];
  taskId = 0;
}
title.focus()
button.addEventListener('click', addTask)

//logic of adding a new task
function addTask() {
  title.focus()
  if (task.value != "") {
    taskTitle = title.value;
    taskText = task.value;

    newTask = {
      taskTitle: taskTitle,
      taskText: taskText,
      taskId: taskId
    }
    title.value = ""
    let text = ""
    text = template.replace('{{taskTitle}}', newTask.taskTitle)
      .replace('{{taskText}}', newTask.taskText)
      .replace('{{id}}', newTask.taskId)
      .replace('{{id}}', newTask.taskId)
      .replace('{{id}}', newTask.taskId);
    taskId++
    db.push(newTask);
    localStorage.db = JSON.stringify(db);
    task.value = ""
    container.innerHTML += text;
    eventList()
  } else {
    task.placeholder = "Your To Do Stuff Here"
  }
}
//loading existing tasks
function loadTasks() {
  let text = ""
  db.forEach(function (db) {
    text += template.replace('{{taskTitle}}', db.taskTitle)
      .replace('{{taskText}}', db.taskText)
      .replace('{{id}}', db.taskId)
      .replace('{{id}}', db.taskId)
      .replace('{{id}}', db.taskId);
  })
  container.innerHTML += text;
  eventList()
}
//deleting task
function deleteTask() {
  let index = this.id
  db.splice(index, 1)

  let text = ""
  container.innerHTML = "";
  for (var j = 0; j < db.length; j++) {
    db[j].taskId = j
    text += template.replace('{{taskTitle}}', db[j].taskTitle)
      .replace('{{taskText}}', db[j].taskText)
      .replace('{{id}}', j)
      .replace('{{id}}', j)
      .replace('{{id}}', j);
  }
  container.innerHTML += text;
  localStorage.db = JSON.stringify(db);

  let editBtn = document.querySelectorAll('.edit')
  for (var i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', editTask)
  }
  let delButton = document.querySelectorAll('.delete')
  for (var i = 0; i < j; i++) {
    delButton[i].addEventListener('click', deleteTask)
  }
  taskId = db.length
}
//editing task
function editTask() {
  let editBtn = document.querySelectorAll('.edit')
  let textarea = document.querySelectorAll('.taskArea')

  textarea[this.id].readOnly = false
  if (textarea[this.id].readOnly == false) {
    editBtn[this.id].removeEventListener('click', editTask)
    editBtn[this.id].addEventListener('click', function () {
      db[this.id].taskText = textarea[this.id].value
      localStorage.db = JSON.stringify(db)
      location.reload()
    })
  }
  textarea[this.id].focus()
  editBtn[this.id].innerHTML = "Done"
}
//generating event listeners for task deleting and editing
function eventList() {
  let editBtn = document.querySelectorAll('.edit')
  for (var i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', editTask)
  }
  let delButton = document.querySelectorAll('.delete')
  for (var i = 0; i < delButton.length; i++) {
    delButton[i].addEventListener('click', deleteTask)
  }
}