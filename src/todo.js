import { domCache, getFormData, displayTodo } from "./domManip";

const todo = (titleP, descP, priorityP, dueDateP, notesP) => {
  let title = titleP;
  let desc = descP;
  let priority = priorityP;
  let dueDate = dueDateP;
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
  const formData = getFormData();

  const newTodo = todo(
    formData.title,
    formData.desc,
    "priority",
    formData.date,
    "notes"
  );

  displayTodo(newTodo);
}

export { todo, createTodo };