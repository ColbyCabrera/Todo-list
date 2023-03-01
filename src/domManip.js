export { domCache, getFormData, displayTodo, displayProject, displayProjectList, init };
import { getProjectList, selectProject, createDefaultProject } from "./project";

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

function displayTodo(todo) {
  const todoDiv = document.createElement("div");
  const todoTitle = document.createElement("h3");
  const todoDescription = document.createElement("p");
  const todoDate = document.createElement("p");

  todoTitle.textContent = todo.getTitle();
  todoDescription.textContent = todo.getDesc();
  todoDate.textContent = todo.getDueDate();

  todoDiv.appendChild(todoTitle);
  todoDiv.appendChild(todoDescription);
  todoDiv.appendChild(todoDate);
  domCache.todoContainer.appendChild(todoDiv);
}

function displayProject(project) {
  domCache.currentProject.textContent = project.getProjectName();
  domCache.todoContainer.innerHTML = ""

  project.getTodos().forEach(todo => {
    displayTodo(todo);
  });
}

function displayProjectList() {
  const projectList = getProjectList();
  domCache.projectContainer.innerHTML = "";
  projectList.forEach((project, index) => {
    const projectName = document.createElement('h3');
    projectName.id = index;
    projectName.textContent = project.getProjectName();
    projectName.addEventListener('click', selectProject);
    domCache.projectContainer.appendChild(projectName);
  });
}

function init() {
  createDefaultProject();
  const projects = getProjectList();
  displayProject(projects[0]);

  displayProjectList();
}