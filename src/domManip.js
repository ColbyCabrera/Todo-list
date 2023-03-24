export {
  domCache,
  getFormData,
  getTodoElements,
  displayTodo,
  displayProject,
  displayProjectList,
  storeProject,
  init,
};
import { getProjectList, selectProject, createDefaultProject, createProject, loadProject, getCurrentProject } from "./project";
import { changePriority, deleteTodo, editTodo, todo, loadTodo } from "./todo";
import format from "date-fns/format";

const domCache = {
  createTodo: document.getElementById("create"),
  editTodo: document.getElementById("edit"),
  todoTitle: document.getElementById("todo-title"),
  todoDescription: document.getElementById("todo-description"),
  todoDate: document.getElementById("todo-date"),
  editTitle: document.getElementById("edit-title"),
  editDescription: document.getElementById("edit-description"),
  editDate: document.getElementById("edit-date"),
  todoContainer: document.getElementById("todos"),
  projectName: document.getElementById("project-title"),
  currentProject: document.getElementById("current-project"),
  projectContainer: document.getElementById("projects"),
};

function getFormData() {
  let title, desc, date, projectName;

  if (domCache.editTodo.classList.contains("hide")) {
    title = domCache.todoTitle.value;
    desc = domCache.todoDescription.value;
    date = domCache.todoDate.value;
    projectName = domCache.projectName.value;
  } else {
    title = domCache.editTitle.value;
    desc = domCache.editDescription.value;
    date = domCache.editDate.value;
    projectName = domCache.projectName.value;
  }

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
  const todoTop = document.createElement("div");
  const todoBottom = document.createElement("div");
  const todoPriority = document.createElement("div");
  const todoEdit = document.createElement("img");
  const todoDelete = document.createElement("img");

  todoTitle.textContent = todo.getTitle();
  todoDescription.textContent = todo.getDesc();
  todoPriority.classList.add("priority");
  todoPriority.addEventListener("click", changePriority);
  todoEdit.addEventListener("click", editTodo);
  todoDelete.addEventListener("click", deleteTodo);
  todoEdit.classList.add("edit");
  todoEdit.src = "../images/edit.png";
  todoDelete.classList.add("delete");
  todoDelete.src = "../images/trashcan.png";

  if (date != null) {
    todoDate.textContent = format(date, "MMMM do, yyyy");
  }

  if (todo.getPriority() === "high") {
    todoPriority.style.backgroundColor = "red";
  } else {
    todoPriority.style.backgroundColor = "#ddd";
  }

  todoTop.appendChild(todoTitle);
  todoTop.appendChild(todoEdit);
  todoDiv.appendChild(todoTop);
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

function storeProject(project) {
  let projectList = [];
  let todos = [];
  getProjectList().forEach(project => {
    projectList.push(project.getProjectName());
  });

  project.getTodos().forEach(todo => {
    const todoObj = {
      title: todo.getTitle(),
      desc: todo.getDesc(),
      dueDate: todo.getDueDate(),
      priority: todo.getPriority(),
      notes: todo.getNotes(),
    }
    console.log(todoObj.dueDate);
    todos.push(todoObj);
  });

  localStorage.setItem("projectList", JSON.stringify(projectList));
  localStorage.setItem("projectName", project.getProjectName());
  localStorage.setItem(project.getProjectName() + "Todos", JSON.stringify(todos));
}

function init() {
  if (storageAvailable("localStorage")) {
    const projectList = JSON.parse(localStorage.getItem("projectList"));

    if (projectList != null) {
      projectList.forEach(projectName => {
        const projectTodos =  JSON.parse(localStorage.getItem(projectName + "Todos"));
        loadProject(projectName);
        if (projectTodos != null) {
          projectTodos.forEach(todo => {
            loadTodo(todo);
          });
        }
      });
    } else {
      createDefaultProject();
    }
  } else {
    createDefaultProject();
  }

  const projects = getProjectList();
  displayProject(projects[0]);
  displayProjectList();
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
