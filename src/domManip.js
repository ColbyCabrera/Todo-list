export {
  domCache,
  getFormData,
  getTodoElements,
  displayTodo,
  displayProject,
  displayProjectList,
  init,
};
import { getProjectList, selectProject, createDefaultProject } from "./project";
import { changePriority, deleteTodo, todo } from "./todo";
import format from "date-fns/format";

const domCache = {
  todoTitle: document.getElementById("todo-title"),
  todoDescription: document.getElementById("todo-description"),
  todoDate: document.getElementById("todo-date"),
  todoContainer: document.getElementById("todos"),
  projectName: document.getElementById("project-title"),
  currentProject: document.getElementById("current-project"),
  projectContainer: document.getElementById("projects"),
};

function getFormData() {
  const title = domCache.todoTitle.value;
  const desc = domCache.todoDescription.value;
  const date = domCache.todoDate.value;
  const projectName = domCache.projectName.value;
  return { title, date, desc, projectName };
}

function getTodoElements() {
  return Array.from(domCache.todoContainer.children);
}

function displayTodo(todo) {
  const date = todo.getDueDate();
  const todoDiv = document.createElement("div");
  const todoTitle = document.createElement("h3");
  const todoDescription = document.createElement("p");
  const todoDate = document.createElement("p");
  const todoBottom = document.createElement("div");
  const todoPriority = document.createElement("div");
  const todoDelete = document.createElement("img");

  todoTitle.textContent = todo.getTitle();
  todoDescription.textContent = todo.getDesc();
  todoPriority.classList.add("priority");
  todoPriority.addEventListener('click', changePriority);
  todoDelete.addEventListener('click', deleteTodo);
  todoDelete.classList.add("delete");
  todoDelete.src = "../images/trashcan.png";

  if (date != null) {
    todoDate.textContent = format(date, "MMMM do, yyyy");
  }

  if (todo.getPriority() === "high") {
    todoPriority.style.backgroundColor = "red";
  } else {
    todoPriority.style.backgroundColor = "#ddd"
  }

  todoDiv.appendChild(todoTitle);
  todoDiv.appendChild(todoDescription);
  todoDiv.appendChild(todoDate);
  todoDiv.appendChild(todoBottom);
  todoBottom.appendChild(todoPriority);
  todoBottom.appendChild(todoDelete);
  domCache.todoContainer.appendChild(todoDiv);
}

function displayProject(project) {
  domCache.currentProject.textContent = project.getProjectName();
  domCache.todoContainer.innerHTML = "";

  project.getTodos().forEach((todo) => {
    displayTodo(todo);
  });
}

function displayProjectList() {
  const projectList = getProjectList();
  domCache.projectContainer.innerHTML = "";
  projectList.forEach((project, index) => {
    const projectName = document.createElement("h3");
    projectName.id = index;
    projectName.textContent = project.getProjectName();
    projectName.addEventListener("click", selectProject);
    domCache.projectContainer.appendChild(projectName);
  });
}

function init() {
  createDefaultProject();
  const projects = getProjectList();
  displayProject(projects[0]);
  displayProjectList();
}
