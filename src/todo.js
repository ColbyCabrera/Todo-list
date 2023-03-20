import {
  getFormData,
  displayProject,
  getTodoElements,
  domCache,
} from "./domManip";
import { getCurrentProject } from "./project";

let currentEdit;

const todo = (titleP, descP, priorityP, dueDateP, notesP) => {
  let title = titleP;
  let desc = descP;
  let priority = priorityP;
  let dueDate;
  let notes = notesP;

  const getTitle = () => {
    return title;
  };

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const getDesc = () => {
    return desc;
  };

  const setDesc = (newdesc) => {
    desc = newdesc;
  };

  const getPriority = () => {
    return priority;
  };

  const setPriority = (newpriority) => {
    priority = newpriority;
  };

  const getDueDate = () => {
    return dueDate;
  };

  const setDueDate = (newDueDate) => {
    if (newDueDate != "") {
      dueDate = new Date(newDueDate.split("-")); // fixes date being behind 1 day
    } else {
      dueDate = null;
    }
  };

  const getNotes = () => {
    return notes;
  };

  const setNotes = (newnotes) => {
    notes = newnotes;
  };

  setDueDate(dueDateP); // set due date

  return {
    getTitle,
    setTitle,
    getDesc,
    setDesc,
    getPriority,
    setPriority,
    getDueDate,
    setDueDate,
    getNotes,
    setNotes,
  };
};

function getCurrentEdit() {
  return currentEdit;
}

function setCurrentEdit(todo) {
  currentEdit = todo;
}

function createTodo(e) {
  e.preventDefault();
  const currentProject = getCurrentProject();
  const formData = getFormData();

  if (formData.title != "") {
    const newTodo = todo(
      formData.title,
      formData.desc,
      "low",
      formData.date,
      "notes"
    );
    currentProject.addTodo(newTodo);
    displayProject(currentProject);
  } else {
    alert("Title is required");
  }
}

function deleteTodo(e) {
  const target = e.target;
  const todoElements = getTodoElements();
  const todoElement = target.parentNode.parentNode;
  const index = todoElements.indexOf(todoElement);
  const todoList = getCurrentProject().getTodos();
  todoList.splice(index, 1);

  // stop user from editing a deleted todo
  if (domCache.createTodo.classList.contains("hide")) {
    domCache.createTodo.classList.toggle("hide");
    domCache.editTodo.classList.toggle("hide");
  }

  displayProject(getCurrentProject());
}

function editTodo(e) {
  e.preventDefault();
  const target = e.target;
  const currentProject = getCurrentProject();
  if (e.target.parentNode.parentNode === domCache.editTodo) {
    const formData = getFormData();
    const todoElements = getTodoElements();
    const todoElement = getCurrentEdit();
    const index = todoElements.indexOf(todoElement);
    const todoList = currentProject.getTodos();
    todoList[index].setTitle(formData.title);
    todoList[index].setDesc(formData.desc);
    todoList[index].setDueDate(formData.date);
    domCache.createTodo.classList.toggle("hide");
    domCache.editTodo.classList.toggle("hide");
    displayProject(currentProject);
  } else {
    const todoElement = target.parentNode.parentNode;
    setCurrentEdit(todoElement);
    domCache.createTodo.classList.toggle("hide");
    domCache.editTodo.classList.toggle("hide");
  }
}

function changePriority(e) {
  const target = e.target;
  const todoElements = getTodoElements();
  const todoElement = target.parentNode.parentNode;
  const index = todoElements.indexOf(todoElement);
  const todoList = getCurrentProject().getTodos();
  const todo = todoList[index];

  if (todo.getPriority() === "high") {
    todo.setPriority("low");
    target.style.backgroundColor = "#ddd";
  } else {
    todo.setPriority("high");
    target.style.backgroundColor = "red";
  }
}

export { todo, createTodo, changePriority, deleteTodo, editTodo };
