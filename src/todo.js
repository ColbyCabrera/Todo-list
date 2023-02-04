import cacheDom from "./cacheDom";

export default todo;

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

//replace these with a module maybe?
function createTodo() {};

function displayTodo() {};