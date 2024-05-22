const tasks = document.querySelector("#tasks-list ul");
const sampelTask = tasks.firstElementChild.cloneNode(true);

// Function for filtering tasks
const filteringTask = function (task) {
  // Get filter value
  const filters = document.getElementsByName("task filter");
  let filterValue;
  filters.forEach(function (f) {
    if (f.checked) {
      filterValue = f.value;
    }
  });

  // Check the task if it should apper or not
  if (filterValue == "checkedTasks") {
    if (task.querySelector("input").checked) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  } else if (filterValue == "notCheckedTasks") {
    if (!task.querySelector("input").checked) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  } else {
    task.style.display = "block";
  }

  // if (task.querySelector('input').checked == true && filterValue == 'checkedTasks') {
  //   task.style.display = 'block'
  // }
  // else if (task.querySelector('input').checked == false && filterValue == 'notCheckedTasks') {
  //   task.style.display = 'block'
  // }
  // else if (filterValue == "both"){
  //   task.style.display = 'block'
  // }
  // else {
  //   task.style.display = 'none'
  // }
};

tasks.addEventListener("click", function (e) {
  const task = e.target.parentElement;

  // Delete Tasks
  if (e.target.classList.contains("delete-btn")) {
    task.parentElement.removeChild(task);
  }

  // Checking the Tasks
  else if (e.target.classList.contains("check-task")) {
    if (e.target.checked) {
      task.querySelector(".task-name").style.textDecoration = "line-through";
      task.querySelector('span[class="button edit-btn"]').style.display =
        "none";
    } else {
      task.querySelector(".task-name").style.textDecoration = "none";
      task.querySelector('span[class="button edit-btn"]').style.display =
        "block";
    }
    filteringTask(task);

  }
  
  // Edit task
  if (e.target.classList.contains('edit-btn')) {
    const nameInput = task.querySelector('input[class="task-name"]');
    if (e.target.textContent == "Edit") {
      nameInput.removeAttribute('readonly');
      nameInput.focus();
      e.target.style.color = "#FF9F1C"
      e.target.textContent = 'Save';
    } else {
      nameInput.setAttribute('readonly', 'readonly')
      e.target.style.color = "#2EC4B6"
      e.target.textContent = 'Edit';
    }
  }
});

// Add task
const addTaskForm = document.forms["add-task"];

addTaskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskName = addTaskForm.querySelector('input[type="text"]').value;
  if (taskName) {
  console.log(taskName);
  const task = sampelTask.cloneNode(true);
  task.querySelector(".task-name").value = taskName;
  tasks.append(task);
  filteringTask(task);
  addTaskForm.querySelector('input[type="text"]').value = "";
  } else {
    window.alert("You can't add task without name :)")
  }
});

// Tasks filter
const TasksFilter = document.forms["tasks-filter"];

TasksFilter.addEventListener("change", function (e) {
  const lis = Array.from(tasks.getElementsByTagName("li"));
  Array.from(lis).forEach(function (task) {
    filteringTask(task);
  });
});
