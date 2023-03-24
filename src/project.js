import {
  getFormData,
  displayProject,
  displayProjectList,
  storeProject,
} from "./domManip";

const projectList = [];
let currentProject;

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
    storeProject(newProject);
    setCurrentProject(newProject);
    displayProject(newProject);
    displayProjectList();
  } else {
    alert("Project name is required");
  }
}

function loadProject(projectName) {
  const newProject = project(projectName);
  addProjectToList(newProject);
  setCurrentProject(newProject);
  displayProject(newProject);
  displayProjectList();
}

function deleteProject(e) {
  const projectList = getProjectList();
  const index = projectList.indexOf(getCurrentProject());
  if (index > 0) {
    projectList.splice(index, 1);
    setCurrentProject(projectList[index - 1]);
    displayProjectList();
    displayProject(getCurrentProject());
  }
}

function selectProject(e) {
  const projects = getProjectList();
  const selectedProject = projects[e.target.id];
  setCurrentProject(selectedProject);
  displayProject(selectedProject);
}

function createDefaultProject() {
  const defaultProject = project("Todos");
  addProjectToList(defaultProject);
  setCurrentProject(defaultProject);
}

export {
  project,
  createProject,
  deleteProject,
  getCurrentProject,
  setCurrentProject,
  selectProject,
  createDefaultProject,
  getProjectList,
  loadProject,
};
