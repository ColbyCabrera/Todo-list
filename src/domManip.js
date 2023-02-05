export { domCache, getFormData, displayTodo };

const domCache = {
  todoTitle: document.getElementById("todo-title"),
  todoDescription: document.getElementById("todo-description"),
  todoDate: document.getElementById("todo-date"),
  todoContainer: document.getElementById("todos"),
};

function getFormData() {
  const title = domCache.todoTitle.value;
  const desc = domCache.todoDescription.value;
  const date = domCache.todoDate.value;
  return { title, date, desc };
}

function displayTodo(todo) {
  const todoTitle = document.createElement("h3");
  const todoDescription = document.createElement("p");
  const todoDate = document.createElement("p");

  todoTitle.textContent = todo.getTitle();
  todoDescription.textContent = todo.getDesc();
  todoDate.textContent = todo.getDueDate();

  domCache.todoContainer.appendChild(todoTitle);
  domCache.todoContainer.appendChild(todoDescription);
  domCache.todoContainer.appendChild(todoDate);
}
