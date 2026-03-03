let tasks = [];

function addTask() {
  const text = document.getElementById("taskInput").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!text || !dueDate) return alert("Fill all fields");

  tasks.push({
    id: Date.now(),
    text,
    priority,
    dueDate,
    completed: false
  });

  document.getElementById("taskInput").value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const search = document.getElementById("search").value.toLowerCase();
  const filter = document.getElementById("filter").value;
  const sort = document.getElementById("sort").value;

  let filtered = tasks.filter(task =>
    task.text.toLowerCase().includes(search)
  );

  if (filter === "Completed")
    filtered = filtered.filter(t => t.completed);
  if (filter === "Pending")
    filtered = filtered.filter(t => !t.completed);
  if (filter === "High")
    filtered = filtered.filter(t => t.priority === "High");

  if (sort === "Date") {
    filtered.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  if (sort === "Priority") {
    const order = { High: 1, Medium: 2, Low: 3 };
    filtered.sort((a,b) => order[a.priority] - order[b.priority]);
  }

  list.innerHTML = "";

  filtered.forEach(task => {
    const li = document.createElement("li");

    li.classList.add(task.priority.toLowerCase());
    if (task.completed) li.classList.add("completed");

    const today = new Date().toISOString().split("T")[0];
    if (task.dueDate < today && !task.completed)
      li.classList.add("overdue");

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">
        ${task.text} - (${task.priority}) - ${task.dueDate}
      </span>
      <button onclick="deleteTask(${task.id})">X</button>
    `;

    list.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}