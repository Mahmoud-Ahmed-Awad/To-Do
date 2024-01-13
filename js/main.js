let taskInp = document.getElementById("task-inp");
let addBtn = document.getElementById("add-btn");
let tasksDiv = document.getElementById("tasks-div");

function showTask(taskId, taskName, done = false) {
  let taskDiv = document.createElement("div");
  taskDiv.className = "task card mt-3";
  if (done == true) {
    taskDiv.classList.add("done");
  }
  let subTaskDiv = document.createElement("div");
  subTaskDiv.className =
    "card-body d-flex justify-content-between align-items-center";
  subTaskDiv.textContent = taskName;
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger";
  deleteBtn.textContent = "Delete";
  subTaskDiv.appendChild(deleteBtn);
  taskDiv.appendChild(subTaskDiv);
  tasksDiv.appendChild(taskDiv);
  deleteBtn.addEventListener("click", () => {
    let curruntTasks = JSON.parse(window.localStorage.getItem("tasks"));
    let tasks = curruntTasks.filter((e) => e.id != taskId);
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    taskDiv.remove();
  });
  taskDiv.addEventListener("click", () => {
    let curruntTasks = JSON.parse(window.localStorage.getItem("tasks"));
    let tasks = curruntTasks.map((e) => {
      if (e.id == taskId) {
        if (e.done == false) {
          e.done = true;
        } else {
          e.done = false;
        }
      }
      return e;
    });
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    taskDiv.classList.toggle("done");
  });
}

if (window.localStorage.getItem("tasks")) {
  let curruntTasks = JSON.parse(window.localStorage.getItem("tasks"));
  curruntTasks.forEach((e) => {
    showTask(e.id, e.name, e.done);
  });
}

addBtn.addEventListener("click", () => {
  let tasks;
  let task = {
    id: 0,
    name: taskInp.value,
    done: false,
  };
  if (window.localStorage.getItem("tasks")) {
    let curruntTasks = JSON.parse(window.localStorage.getItem("tasks"));
    task.id =
      curruntTasks.length > 0
        ? curruntTasks[curruntTasks.length - 1].id + 1
        : 0;
    tasks = [...curruntTasks, task];
  } else {
    tasks = [task];
  }
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  showTask(task.id, task.name);
  taskInp.value = "";
});

let sun = document.querySelector(".sun")
let moon = document.querySelector(".moon")
let button = document.querySelector(".theme-mod")

button.addEventListener("click", () => {
  sun.classList.toggle("visible")
  moon.classList.toggle("visible")
  if (document.body.dataset.bsTheme == "dark") {
    window.localStorage.setItem("theme", "light");
    document.body.dataset.bsTheme = "light"
  } else {
    window.localStorage.setItem("theme", "dark");
    document.body.dataset.bsTheme = "dark"
  }
})

if (window.localStorage.getItem("theme")){
  document.body.dataset.bsTheme = window.localStorage.getItem("theme");
  if (window.localStorage.getItem("theme") == "dark") {
    moon.classList.add("visible")
  } else {
    sun.classList.add("visible")
  }
} else {
  if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.dataset.bsTheme = "dark";
  moon.classList.add("visible")
} else {
  document.body.dataset.bsTheme = "light";
  sun.classList.add("visible")
}
}