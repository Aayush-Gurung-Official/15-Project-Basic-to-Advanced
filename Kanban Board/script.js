const addButtons = document.querySelectorAll(".add-btn");
const taskLists = document.querySelectorAll(".task-list");

let draggedTask = null;

/* ===============================
   ADD TASK
================================= */

addButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const taskText = prompt("Enter new task:");
    if (!taskText) return;

    const task = createTask(taskText);
    taskLists[index].appendChild(task);
  });
});

/* ===============================
   CREATE TASK
================================= */

function createTask(text) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");
  task.textContent = text;

  task.addEventListener("dragstart", () => {
    draggedTask = task;
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    draggedTask = null;
    task.classList.remove("dragging");
  });

  return task;
}

/* ===============================
   DRAG & DROP
================================= */

taskLists.forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  list.addEventListener("drop", () => {
    if (draggedTask) {
      list.appendChild(draggedTask);
    }
  });
});