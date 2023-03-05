import { el } from "date-fns/locale";
import { getFormData, displayProject } from "./domManip";
import { getCurrentProject } from "./project";
// add id to todos and ability to remove todo from project list
// add delete project functionality, update ids when project is deleted
// add ability to edit todos
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

  const setdueDate = (newDueDate) => {
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

  setdueDate(dueDateP); // set due date

  return {
    getTitle,
    setTitle,
    getDesc,
    setDesc,
    getPriority,
    setPriority,
    getDueDate,
    setdueDate,
    getNotes,
    setNotes,
  };
};

function createTodo(event) {
  event.preventDefault();
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
  const todoElements = Array.from(target.parentNode.parentNode.children);
  const index = todoElements.indexOf(target.parentNode);
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

function changePriority(e) {
  const target = e.target;
  const todoElements = Array.from(target.parentNode.parentNode.children);
  const index = todoElements.indexOf(target.parentNode);
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

export { todo, createTodo, changePriority };
