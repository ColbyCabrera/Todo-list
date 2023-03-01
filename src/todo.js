import { getFormData, displayProject } from "./domManip";
import { getCurrentProject } from "./project";
// Priority will be binary if high priority display red dot else display nothing
// add id to todos and ability to remove todo from project list
// add delete project functionality, update ids when project is deleted
// add ability to edit todos
const todo = (titleP, descP, priorityP, dueDateP, notesP) => {
  let title = titleP;
  let desc = descP;
  let priority = priorityP;
  let dueDate = new Date(dueDateP.split("-")); // fixes date being behind 1 day
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
    dueDate = newDueDate;
  };

  const getNotes = () => {
    return notes;
  };

  const setNotes = (newnotes) => {
    notes = newnotes;
  };

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
      "priority",
      formData.date,
      "notes"
    );
    currentProject.addTodo(newTodo);
    displayProject(currentProject);
  } else {
    alert("Title is required");
  }
}

export { todo, createTodo };
