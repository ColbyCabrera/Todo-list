import { getFormData, displayProject, displayProjectList } from "./domManip";

const project = (projectName) => {
  const name = projectName;
  let todos = [];

  const addTodo = (todo) => {
    todos.push(todo);
  };

  const getTodos = () => {
    return todos;
  };

  const getProjectName = () => {
    return name;
  };

  return { addTodo, getProjectName, getTodos };
};

const projectList = [];
const defaultProject = project("Todos");
let currentProject = defaultProject;

function addProjectToList(project) {
  projectList.push(project);
}

function getProjectList() {
  return projectList;
}

function getCurrentProject() {
  return currentProject;
}

function setCurrentProject(project) {
  currentProject = project;
}

function createProject(event) {
  event.preventDefault();

  const formData = getFormData();
  if (formData.projectName != "") {
    const newProject = project(formData.projectName);
    addProjectToList(newProject);
    setCurrentProject(newProject);
    displayProject(newProject);
    displayProjectList(getProjectList());
  } else {
    alert("Project name is required");
  }
}

export { project, createProject, getCurrentProject, setCurrentProject };
